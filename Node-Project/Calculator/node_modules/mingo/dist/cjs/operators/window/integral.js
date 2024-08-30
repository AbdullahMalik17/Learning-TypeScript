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
var integral_exports = {};
__export(integral_exports, {
  $integral: () => $integral
});
module.exports = __toCommonJS(integral_exports);
var import_util = require("../../util");
var import_accumulator = require("../accumulator");
var import_internal = require("./_internal");
function $integral(_, collection, expr, options) {
  const { input, unit } = expr.inputExpr;
  const sortKey = "$" + Object.keys(expr.parentExpr.sortBy)[0];
  const points = (0, import_accumulator.$push)(collection, [sortKey, input], options).filter(
    ([x, y]) => (0, import_util.isNumber)(+x) && (0, import_util.isNumber)(+y)
  );
  if (points.length !== collection.length)
    return null;
  let result = 0;
  const size = collection.length;
  for (let k = 1; k < size; k++) {
    const [x1, y1] = points[k - 1];
    const [x2, y2] = points[k];
    const deltaX = (x2 - x1) / (import_internal.MILLIS_PER_UNIT[unit] || 1);
    result += 0.5 * (y1 + y2) * deltaX;
  }
  return result;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $integral
});
