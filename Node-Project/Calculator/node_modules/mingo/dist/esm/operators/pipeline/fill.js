import { initOptions } from "../../core";
import { assert, has, isObject } from "../../util";
import { $ifNull } from "../expression/conditional/ifNull";
import { $linearFill } from "../window/linearFill";
import { $locf } from "../window/locf";
import { $addFields } from "./addFields";
import { $setWindowFields } from "./setWindowFields";
const FILL_METHODS = {
  locf: "$locf",
  linear: "$linearFill"
};
const $fill = (collection, expr, options) => {
  assert(!expr.sortBy || isObject(expr.sortBy), "sortBy must be an object.");
  assert(
    !!expr.sortBy || Object.values(expr.output).every((m) => has(m, "value")),
    "sortBy required if any output field specifies a 'method'."
  );
  assert(
    !(expr.partitionBy && expr.partitionByFields),
    "specify either partitionBy or partitionByFields."
  );
  assert(
    !expr.partitionByFields || expr?.partitionByFields?.every((s) => s[0] !== "$"),
    "fields in partitionByFields cannot begin with '$'."
  );
  options = initOptions(options);
  options.context.addExpressionOps({ $ifNull });
  options.context.addWindowOps({ $locf, $linearFill });
  const partitionExpr = expr.partitionBy || expr?.partitionByFields?.map((s) => `$${s}`);
  const valueExpr = {};
  const methodExpr = {};
  for (const [k, m] of Object.entries(expr.output)) {
    if (has(m, "value")) {
      valueExpr[k] = { $ifNull: [`$$CURRENT.${k}`, m["value"]] };
    } else {
      const fillOp = FILL_METHODS[m["method"]];
      assert(!!fillOp, `invalid fill method '${m["method"]}'.`);
      methodExpr[k] = { [fillOp]: "$" + k };
    }
  }
  if (Object.keys(methodExpr).length > 0) {
    collection = $setWindowFields(
      collection,
      {
        sortBy: expr.sortBy || {},
        partitionBy: partitionExpr,
        output: methodExpr
      },
      options
    );
  }
  if (Object.keys(valueExpr).length > 0) {
    collection = $addFields(collection, valueExpr, options);
  }
  return collection;
};
export {
  $fill
};
