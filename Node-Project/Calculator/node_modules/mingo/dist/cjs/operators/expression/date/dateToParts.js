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
var dateToParts_exports = {};
__export(dateToParts_exports, {
  $dateToParts: () => $dateToParts
});
module.exports = __toCommonJS(dateToParts_exports);
var import_core = require("../../../core");
var import_internal = require("./_internal");
const $dateToParts = (obj, expr, options) => {
  const args = (0, import_core.computeValue)(obj, expr, null, options);
  const d = new Date(args.date);
  const tz = (0, import_internal.parseTimezone)(args.timezone);
  (0, import_internal.adjustDate)(d, tz);
  const timePart = {
    hour: d.getUTCHours(),
    minute: d.getUTCMinutes(),
    second: d.getUTCSeconds(),
    millisecond: d.getUTCMilliseconds()
  };
  if (args.iso8601 == true) {
    return Object.assign(timePart, {
      isoWeekYear: (0, import_internal.isoWeekYear)(d),
      isoWeek: (0, import_internal.isoWeek)(d),
      isoDayOfWeek: d.getUTCDay() || 7
    });
  }
  return Object.assign(timePart, {
    year: d.getUTCFullYear(),
    month: d.getUTCMonth() + 1,
    day: d.getUTCDate()
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $dateToParts
});
