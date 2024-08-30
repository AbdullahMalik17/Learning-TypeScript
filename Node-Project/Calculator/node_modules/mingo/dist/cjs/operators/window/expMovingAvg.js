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
var expMovingAvg_exports = {};
__export(expMovingAvg_exports, {
  $expMovingAvg: () => $expMovingAvg
});
module.exports = __toCommonJS(expMovingAvg_exports);
var import_util = require("../../util");
var import_accumulator = require("../accumulator");
var import_internal = require("./_internal");
function $expMovingAvg(_, collection, expr, options) {
  const { input, N, alpha } = expr.inputExpr;
  (0, import_util.assert)(
    !(N && alpha),
    `You must specify either N or alpha. You cannot specify both.`
  );
  return (0, import_internal.withMemo)(
    collection,
    expr,
    () => {
      const series = (0, import_accumulator.$push)(collection, input, options).filter(import_util.isNumber);
      return series.length === collection.length ? series : null;
    },
    (series) => {
      if (series === null)
        return null;
      if (expr.documentNumber == 1)
        return series[0];
      const weight = N != void 0 ? 2 / (N + 1) : alpha;
      const i = expr.documentNumber - 1;
      series[i] = series[i] * weight + series[i - 1] * (1 - weight);
      return series[i];
    }
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $expMovingAvg
});
