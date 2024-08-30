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
var dateFromParts_exports = {};
__export(dateFromParts_exports, {
  $dateFromParts: () => $dateFromParts
});
module.exports = __toCommonJS(dateFromParts_exports);
var import_core = require("../../../core");
var import_internal = require("./_internal");
const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const getDaysInMonth = (date) => {
  return date.month == 2 && (0, import_internal.isLeapYear)(date.year) ? 29 : DAYS_IN_MONTH[date.month - 1];
};
const $dateFromParts = (obj, expr, options) => {
  const args = (0, import_core.computeValue)(obj, expr, null, options);
  const minuteOffset = (0, import_internal.parseTimezone)(args.timezone);
  for (let i = import_internal.DATE_PART_INTERVAL.length - 1, remainder = 0; i >= 0; i--) {
    const datePartInterval = import_internal.DATE_PART_INTERVAL[i];
    const k = datePartInterval[0];
    const min = datePartInterval[1];
    const max = datePartInterval[2];
    let part = (args[k] || 0) + remainder;
    remainder = 0;
    const limit = max + 1;
    if (k == "hour")
      part += Math.floor(minuteOffset / import_internal.MINUTES_PER_HOUR) * -1;
    if (k == "minute")
      part += minuteOffset % import_internal.MINUTES_PER_HOUR * -1;
    if (part < min) {
      const delta = min - part;
      remainder = -1 * Math.ceil(delta / limit);
      part = limit - delta % limit;
    } else if (part > max) {
      part += min;
      remainder = Math.trunc(part / limit);
      part %= limit;
    }
    args[k] = part;
  }
  args.day = Math.min(args.day, getDaysInMonth(args));
  return new Date(
    Date.UTC(
      args.year,
      args.month - 1,
      args.day,
      args.hour,
      args.minute,
      args.second,
      args.millisecond
    )
  );
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $dateFromParts
});
