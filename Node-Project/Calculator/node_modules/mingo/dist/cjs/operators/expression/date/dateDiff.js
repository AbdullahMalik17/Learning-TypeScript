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
var dateDiff_exports = {};
__export(dateDiff_exports, {
  $dateDiff: () => $dateDiff
});
module.exports = __toCommonJS(dateDiff_exports);
var import_core = require("../../../core");
var import_internal = require("./_internal");
const $dateDiff = (obj, expr, options) => {
  const args = (0, import_core.computeValue)(obj, expr, null, options);
  const d1 = (0, import_internal.computeDate)(obj, expr.startDate, options);
  const d2 = (0, import_internal.computeDate)(obj, expr.endDate, options);
  let diff;
  switch (args.unit) {
    case "year":
    case "quarter":
    case "month":
      diff = diffYQM(d1, d2, args.unit);
      break;
    default:
      diff = (d2.getTime() - d1.getTime()) / import_internal.DURATION_IN_MILLIS[args.unit];
  }
  return diff;
};
const unitMonths = {
  year: 12,
  quarter: 3,
  month: 1
};
function diffYQM(d1, d2, unit) {
  let months = (d2.getUTCFullYear() - d1.getUTCFullYear()) * 12;
  months -= d1.getUTCMonth();
  months += d2.getUTCMonth();
  return Math.trunc(months / unitMonths[unit]);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $dateDiff
});
