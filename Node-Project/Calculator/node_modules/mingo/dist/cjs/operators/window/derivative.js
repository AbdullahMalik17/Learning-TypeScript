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
var derivative_exports = {};
__export(derivative_exports, {
  $derivative: () => $derivative
});
module.exports = __toCommonJS(derivative_exports);
var import_util = require("../../util");
var import_accumulator = require("../accumulator");
var import_internal = require("./_internal");
function $derivative(_, collection, expr, options) {
  if (collection.length < 2)
    return null;
  const { input, unit } = expr.inputExpr;
  const sortKey = "$" + Object.keys(expr.parentExpr.sortBy)[0];
  const values = [collection[0], collection[collection.length - 1]];
  const points = (0, import_accumulator.$push)(values, [sortKey, input], options).filter(
    ([x, y]) => (0, import_util.isNumber)(+x) && (0, import_util.isNumber)(+y)
  );
  if (points.length !== 2)
    return null;
  const [[x1, y1], [x2, y2]] = points;
  const deltaX = (x2 - x1) / (import_internal.MILLIS_PER_UNIT[unit] || 1);
  return (y2 - y1) / deltaX;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $derivative
});
