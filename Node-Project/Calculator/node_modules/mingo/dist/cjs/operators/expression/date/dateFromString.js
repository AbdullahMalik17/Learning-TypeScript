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
var dateFromString_exports = {};
__export(dateFromString_exports, {
  $dateFromString: () => $dateFromString
});
module.exports = __toCommonJS(dateFromString_exports);
var import_core = require("../../../core");
var import_util = require("../../../util");
var import_internal = require("./_internal");
const buildMap = (letters, sign) => {
  const h = {};
  letters.split("").forEach((v, i) => h[v] = sign * (i + 1));
  return h;
};
const TZ_LETTER_OFFSETS = {
  ...buildMap("ABCDEFGHIKLM", 1),
  ...buildMap("NOPQRSTUVWXY", -1),
  Z: 0
};
const $dateFromString = (obj, expr, options) => {
  const args = (0, import_core.computeValue)(obj, expr, null, options);
  args.format = args.format || import_internal.DATE_FORMAT;
  args.onNull = args.onNull || null;
  let dateString = args.dateString;
  if ((0, import_util.isNil)(dateString))
    return args.onNull;
  const separators = args.format.split(/%[YGmdHMSLuVzZ]/);
  separators.reverse();
  const matches = args.format.match(
    /(%%|%Y|%G|%m|%d|%H|%M|%S|%L|%u|%V|%z|%Z)/g
  );
  const dateParts = {};
  let expectedPattern = "";
  for (let i = 0, len = matches.length; i < len; i++) {
    const formatSpecifier = matches[i];
    const props = import_internal.DATE_SYM_TABLE[formatSpecifier];
    if ((0, import_util.isObject)(props)) {
      const m2 = props.re.exec(dateString);
      const delimiter = separators.pop() || "";
      if (m2 !== null) {
        dateParts[props.name] = /^\d+$/.exec(m2[0]) ? parseInt(m2[0]) : m2[0];
        dateString = dateString.substr(0, m2.index) + dateString.substr(m2.index + m2[0].length);
        expectedPattern += (0, import_internal.regexQuote)(delimiter) + (0, import_internal.regexStrip)(props.re.toString());
      } else {
        dateParts[props.name] = null;
      }
    }
  }
  if ((0, import_util.isNil)(dateParts.year) || (0, import_util.isNil)(dateParts.month) || (0, import_util.isNil)(dateParts.day) || !new RegExp("^" + expectedPattern + "[A-Z]?$").exec(args.dateString)) {
    return args.onError;
  }
  const m = args.dateString.match(/([A-Z])$/);
  (0, import_util.assert)(
    // only one of in-date timeone or timezone argument but not both.
    !(m && args.timezone),
    `$dateFromString: you cannot pass in a date/time string with time zone information ('${m && m[0]}') together with a timezone argument`
  );
  const minuteOffset = m ? TZ_LETTER_OFFSETS[m[0]] * import_internal.MINUTES_PER_HOUR : (0, import_internal.parseTimezone)(args.timezone);
  const d = new Date(
    Date.UTC(dateParts.year, dateParts.month - 1, dateParts.day, 0, 0, 0)
  );
  if (!(0, import_util.isNil)(dateParts.hour))
    d.setUTCHours(dateParts.hour);
  if (!(0, import_util.isNil)(dateParts.minute))
    d.setUTCMinutes(dateParts.minute);
  if (!(0, import_util.isNil)(dateParts.second))
    d.setUTCSeconds(dateParts.second);
  if (!(0, import_util.isNil)(dateParts.millisecond))
    d.setUTCMilliseconds(dateParts.millisecond);
  (0, import_internal.adjustDate)(d, -minuteOffset);
  return d;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $dateFromString
});
