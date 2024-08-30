import {
  getOperator,
  initOptions,
  OperatorType
} from "../../core";
import { compose, Lazy } from "../../lazy";
import { assert, isNumber, isOperator, isString } from "../../util";
import { $function } from "../expression/custom/function";
import { $dateAdd } from "../expression/date/dateAdd";
import { isUnbounded } from "./_internal";
import { $addFields } from "./addFields";
import { $group } from "./group";
import { $sort } from "./sort";
const SORT_REQUIRED_OPS = /* @__PURE__ */ new Set([
  "$denseRank",
  "$documentNumber",
  "$first",
  "$last",
  "$linearFill",
  "$rank",
  "$shift"
]);
const WINDOW_UNBOUNDED_OPS = /* @__PURE__ */ new Set([
  "$denseRank",
  "$expMovingAvg",
  "$linearFill",
  "$locf",
  "$rank",
  "$shift"
]);
const $setWindowFields = (collection, expr, options) => {
  options = initOptions(options);
  options.context.addExpressionOps({ $function });
  for (const outputExpr of Object.values(expr.output)) {
    const keys = Object.keys(outputExpr);
    const op = keys.find(isOperator);
    assert(
      !!getOperator(OperatorType.WINDOW, op, options) || !!getOperator(OperatorType.ACCUMULATOR, op, options),
      `'${op}' is not a valid window operator`
    );
    assert(
      keys.length > 0 && keys.length <= 2 && (keys.length == 1 || keys.includes("window")),
      "'output' option should have a single window operator."
    );
    if (outputExpr?.window) {
      const { documents, range } = outputExpr.window;
      assert(
        !!documents && !range || !documents && !!range || !documents && !range,
        "'window' option supports only one of 'documents' or 'range'."
      );
    }
  }
  if (expr.sortBy) {
    collection = $sort(collection, expr.sortBy, options);
  }
  collection = $group(
    collection,
    {
      _id: expr.partitionBy,
      items: { $push: "$$CURRENT" }
    },
    options
  );
  return collection.transform((partitions) => {
    const iterators = [];
    const outputConfig = [];
    for (const [field, outputExpr] of Object.entries(expr.output)) {
      const op = Object.keys(outputExpr).find(isOperator);
      const config = {
        operatorName: op,
        func: {
          left: getOperator(
            OperatorType.ACCUMULATOR,
            op,
            options
          ),
          right: getOperator(OperatorType.WINDOW, op, options)
        },
        args: outputExpr[op],
        field,
        window: outputExpr.window
      };
      assert(
        !!expr.sortBy || !(SORT_REQUIRED_OPS.has(op) || !config.window),
        `${SORT_REQUIRED_OPS.has(op) ? `'${op}'` : "bounded window operation"} requires a sortBy.`
      );
      assert(
        !config.window || !WINDOW_UNBOUNDED_OPS.has(op),
        `${op} does not accept a 'window' field.`
      );
      outputConfig.push(config);
    }
    partitions.forEach((group) => {
      const items = group.items;
      let iterator = Lazy(items);
      const windowResultMap = {};
      for (const config of outputConfig) {
        const { func, args, field, window } = config;
        const makeResultFunc = (getItemsFn) => {
          let index = -1;
          return (obj) => {
            ++index;
            if (func.left) {
              return func.left(getItemsFn(obj, index), args, options);
            } else if (func.right) {
              return func.right(
                obj,
                getItemsFn(obj, index),
                {
                  parentExpr: expr,
                  inputExpr: args,
                  documentNumber: index + 1,
                  field
                },
                // must use raw options only since it operates over a collection.
                options
              );
            }
          };
        };
        if (window) {
          const { documents, range, unit } = window;
          const boundary = documents || range;
          if (!isUnbounded(window)) {
            const [begin, end] = boundary;
            const toBeginIndex = (currentIndex) => {
              if (begin == "current")
                return currentIndex;
              if (begin == "unbounded")
                return 0;
              return Math.max(begin + currentIndex, 0);
            };
            const toEndIndex = (currentIndex) => {
              if (end == "current")
                return currentIndex + 1;
              if (end == "unbounded")
                return items.length;
              return end + currentIndex + 1;
            };
            const getItems = (current, index) => {
              if (!!documents || boundary.every(isString)) {
                return items.slice(toBeginIndex(index), toEndIndex(index));
              }
              const sortKey = Object.keys(expr.sortBy)[0];
              let lower;
              let upper;
              if (unit) {
                const getTime = (amount) => {
                  return $dateAdd(
                    current,
                    {
                      startDate: new Date(current[sortKey]),
                      unit,
                      amount
                    },
                    options
                  ).getTime();
                };
                lower = isNumber(begin) ? getTime(begin) : -Infinity;
                upper = isNumber(end) ? getTime(end) : Infinity;
              } else {
                const currentValue = current[sortKey];
                lower = isNumber(begin) ? currentValue + begin : -Infinity;
                upper = isNumber(end) ? currentValue + end : Infinity;
              }
              let array = items;
              if (begin == "current")
                array = items.slice(index);
              if (end == "current")
                array = items.slice(0, index + 1);
              return array.filter((o) => {
                const n = +o[sortKey];
                return n >= lower && n <= upper;
              });
            };
            windowResultMap[field] = makeResultFunc(getItems);
          }
        }
        if (!windowResultMap[field]) {
          windowResultMap[field] = makeResultFunc((_) => items);
        }
        iterator = $addFields(
          iterator,
          {
            [field]: {
              $function: {
                body: (obj) => windowResultMap[field](obj),
                args: ["$$CURRENT"]
              }
            }
          },
          options
        );
      }
      iterators.push(iterator);
    });
    return compose(...iterators);
  });
};
export {
  $setWindowFields
};
