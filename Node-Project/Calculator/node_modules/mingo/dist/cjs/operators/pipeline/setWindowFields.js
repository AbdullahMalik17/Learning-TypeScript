var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var setWindowFields_exports = {};
__export(setWindowFields_exports, {
  $setWindowFields: () => $setWindowFields
});
module.exports = __toCommonJS(setWindowFields_exports);
var import_core = require("../../core");
var import_lazy = require("../../lazy");
var import_util = require("../../util");
var import_function = require("../expression/custom/function");
var import_dateAdd = require("../expression/date/dateAdd");
var import_internal = require("./_internal");
var import_addFields = require("./addFields");
var import_group = require("./group");
var import_sort = require("./sort");
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
  options = (0, import_core.initOptions)(options);
  options.context.addExpressionOps({ $function: import_function.$function });
  for (const outputExpr of Object.values(expr.output)) {
    const keys = Object.keys(outputExpr);
    const op = keys.find(import_util.isOperator);
    (0, import_util.assert)(
      !!(0, import_core.getOperator)(import_core.OperatorType.WINDOW, op, options) || !!(0, import_core.getOperator)(import_core.OperatorType.ACCUMULATOR, op, options),
      `'${op}' is not a valid window operator`
    );
    (0, import_util.assert)(
      keys.length > 0 && keys.length <= 2 && (keys.length == 1 || keys.includes("window")),
      "'output' option should have a single window operator."
    );
    if (outputExpr?.window) {
      const { documents, range } = outputExpr.window;
      (0, import_util.assert)(
        !!documents && !range || !documents && !!range || !documents && !range,
        "'window' option supports only one of 'documents' or 'range'."
      );
    }
  }
  if (expr.sortBy) {
    collection = (0, import_sort.$sort)(collection, expr.sortBy, options);
  }
  collection = (0, import_group.$group)(
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
      const op = Object.keys(outputExpr).find(import_util.isOperator);
      const config = {
        operatorName: op,
        func: {
          left: (0, import_core.getOperator)(
            import_core.OperatorType.ACCUMULATOR,
            op,
            options
          ),
          right: (0, import_core.getOperator)(import_core.OperatorType.WINDOW, op, options)
        },
        args: outputExpr[op],
        field,
        window: outputExpr.window
      };
      (0, import_util.assert)(
        !!expr.sortBy || !(SORT_REQUIRED_OPS.has(op) || !config.window),
        `${SORT_REQUIRED_OPS.has(op) ? `'${op}'` : "bounded window operation"} requires a sortBy.`
      );
      (0, import_util.assert)(
        !config.window || !WINDOW_UNBOUNDED_OPS.has(op),
        `${op} does not accept a 'window' field.`
      );
      outputConfig.push(config);
    }
    partitions.forEach((group) => {
      const items = group.items;
      let iterator = (0, import_lazy.Lazy)(items);
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
          if (!(0, import_internal.isUnbounded)(window)) {
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
              if (!!documents || boundary.every(import_util.isString)) {
                return items.slice(toBeginIndex(index), toEndIndex(index));
              }
              const sortKey = Object.keys(expr.sortBy)[0];
              let lower;
              let upper;
              if (unit) {
                const getTime = (amount) => {
                  return (0, import_dateAdd.$dateAdd)(
                    current,
                    {
                      startDate: new Date(current[sortKey]),
                      unit,
                      amount
                    },
                    options
                  ).getTime();
                };
                lower = (0, import_util.isNumber)(begin) ? getTime(begin) : -Infinity;
                upper = (0, import_util.isNumber)(end) ? getTime(end) : Infinity;
              } else {
                const currentValue = current[sortKey];
                lower = (0, import_util.isNumber)(begin) ? currentValue + begin : -Infinity;
                upper = (0, import_util.isNumber)(end) ? currentValue + end : Infinity;
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
        iterator = (0, import_addFields.$addFields)(
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
    return (0, import_lazy.compose)(...iterators);
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $setWindowFields
});
