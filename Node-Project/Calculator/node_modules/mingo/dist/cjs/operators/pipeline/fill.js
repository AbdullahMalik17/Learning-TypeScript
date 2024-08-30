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
var fill_exports = {};
__export(fill_exports, {
  $fill: () => $fill
});
module.exports = __toCommonJS(fill_exports);
var import_core = require("../../core");
var import_util = require("../../util");
var import_ifNull = require("../expression/conditional/ifNull");
var import_linearFill = require("../window/linearFill");
var import_locf = require("../window/locf");
var import_addFields = require("./addFields");
var import_setWindowFields = require("./setWindowFields");
const FILL_METHODS = {
  locf: "$locf",
  linear: "$linearFill"
};
const $fill = (collection, expr, options) => {
  (0, import_util.assert)(!expr.sortBy || (0, import_util.isObject)(expr.sortBy), "sortBy must be an object.");
  (0, import_util.assert)(
    !!expr.sortBy || Object.values(expr.output).every((m) => (0, import_util.has)(m, "value")),
    "sortBy required if any output field specifies a 'method'."
  );
  (0, import_util.assert)(
    !(expr.partitionBy && expr.partitionByFields),
    "specify either partitionBy or partitionByFields."
  );
  (0, import_util.assert)(
    !expr.partitionByFields || expr?.partitionByFields?.every((s) => s[0] !== "$"),
    "fields in partitionByFields cannot begin with '$'."
  );
  options = (0, import_core.initOptions)(options);
  options.context.addExpressionOps({ $ifNull: import_ifNull.$ifNull });
  options.context.addWindowOps({ $locf: import_locf.$locf, $linearFill: import_linearFill.$linearFill });
  const partitionExpr = expr.partitionBy || expr?.partitionByFields?.map((s) => `$${s}`);
  const valueExpr = {};
  const methodExpr = {};
  for (const [k, m] of Object.entries(expr.output)) {
    if ((0, import_util.has)(m, "value")) {
      valueExpr[k] = { $ifNull: [`$$CURRENT.${k}`, m["value"]] };
    } else {
      const fillOp = FILL_METHODS[m["method"]];
      (0, import_util.assert)(!!fillOp, `invalid fill method '${m["method"]}'.`);
      methodExpr[k] = { [fillOp]: "$" + k };
    }
  }
  if (Object.keys(methodExpr).length > 0) {
    collection = (0, import_setWindowFields.$setWindowFields)(
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
    collection = (0, import_addFields.$addFields)(collection, valueExpr, options);
  }
  return collection;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $fill
});
