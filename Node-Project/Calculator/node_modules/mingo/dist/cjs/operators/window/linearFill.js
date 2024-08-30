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
var linearFill_exports = {};
__export(linearFill_exports, {
  $linearFill: () => $linearFill
});
module.exports = __toCommonJS(linearFill_exports);
var import_util = require("../../util");
var import_accumulator = require("../accumulator");
var import_internal = require("./_internal");
const interpolate = (x1, y1, x2, y2, x) => y1 + (x - x1) * ((y2 - y1) / (x2 - x1));
function $linearFill(_, collection, expr, options) {
  return (0, import_internal.withMemo)(
    collection,
    expr,
    () => {
      const sortKey = "$" + Object.keys(expr.parentExpr.sortBy)[0];
      const points = (0, import_accumulator.$push)(
        collection,
        [sortKey, expr.inputExpr],
        options
      ).filter(([x, _2]) => (0, import_util.isNumber)(+x));
      if (points.length !== collection.length)
        return null;
      let lindex = -1;
      let rindex = 0;
      while (rindex < points.length) {
        while (lindex + 1 < points.length && (0, import_util.isNumber)(points[lindex + 1][1])) {
          lindex++;
          rindex = lindex;
        }
        while (rindex + 1 < points.length && !(0, import_util.isNumber)(points[rindex + 1][1])) {
          rindex++;
        }
        if (rindex + 1 >= points.length)
          break;
        rindex++;
        while (lindex + 1 < rindex) {
          points[lindex + 1][1] = interpolate(
            points[lindex][0],
            points[lindex][1],
            points[rindex][0],
            points[rindex][1],
            points[lindex + 1][0]
          );
          lindex++;
        }
        lindex = rindex;
      }
      return points.map(([_2, y]) => y);
    },
    (values) => values[expr.documentNumber - 1]
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $linearFill
});
