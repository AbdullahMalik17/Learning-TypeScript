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
var dateAdd_exports = {};
__export(dateAdd_exports, {
  $dateAdd: () => $dateAdd
});
module.exports = __toCommonJS(dateAdd_exports);
var import_core = require("../../../core");
var import_internal = require("./_internal");
const $dateAdd = (obj, expr, options) => {
  const args = (0, import_core.computeValue)(obj, expr, null, options);
  const d = (0, import_internal.computeDate)(obj, expr.startDate, options);
  switch (args.unit) {
    case "year":
      d.setUTCFullYear(d.getUTCFullYear() + args.amount);
      break;
    case "quarter":
      addMonth(d, 3 * args.amount);
      break;
    case "month":
      addMonth(d, args.amount);
      break;
    default:
      d.setTime(d.getTime() + import_internal.DURATION_IN_MILLIS[args.unit] * args.amount);
  }
  if (args.timezone) {
    const tz = (0, import_internal.parseTimezone)(args.timezone);
    (0, import_internal.adjustDate)(d, tz);
  }
  return d;
};
function addMonth(d, amount) {
  const m = d.getUTCMonth() + amount;
  const yearOffset = Math.floor(m / 12);
  if (m < 0) {
    const month = m % 12 + 12;
    d.setUTCFullYear(d.getUTCFullYear() + yearOffset, month, d.getUTCDate());
  } else {
    d.setUTCFullYear(d.getUTCFullYear() + yearOffset, m % 12, d.getUTCDate());
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $dateAdd
});
