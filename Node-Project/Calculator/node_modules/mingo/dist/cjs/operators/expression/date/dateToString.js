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
var dateToString_exports = {};
__export(dateToString_exports, {
  $dateToString: () => $dateToString
});
module.exports = __toCommonJS(dateToString_exports);
var import_core = require("../../../core");
var import_util = require("../../../util");
var import_internal = require("./_internal");
var import_dayOfMonth = require("./dayOfMonth");
var import_hour = require("./hour");
var import_isoDayOfWeek = require("./isoDayOfWeek");
var import_isoWeek = require("./isoWeek");
var import_millisecond = require("./millisecond");
var import_minute = require("./minute");
var import_month = require("./month");
var import_second = require("./second");
var import_week = require("./week");
var import_year = require("./year");
const DATE_FUNCTIONS = {
  "%Y": import_year.$year,
  "%G": import_year.$year,
  "%m": import_month.$month,
  "%d": import_dayOfMonth.$dayOfMonth,
  "%H": import_hour.$hour,
  "%M": import_minute.$minute,
  "%S": import_second.$second,
  "%L": import_millisecond.$millisecond,
  "%u": import_isoDayOfWeek.$isoDayOfWeek,
  "%U": import_week.$week,
  "%V": import_isoWeek.$isoWeek
};
const $dateToString = (obj, expr, options) => {
  const args = (0, import_core.computeValue)(obj, expr, null, options);
  if ((0, import_util.isNil)(args.onNull))
    args.onNull = null;
  if ((0, import_util.isNil)(args.date))
    return args.onNull;
  const date = (0, import_internal.computeDate)(obj, args.date, options);
  let format = args.format || import_internal.DATE_FORMAT;
  const minuteOffset = (0, import_internal.parseTimezone)(args.timezone);
  const matches = format.match(/(%%|%Y|%G|%m|%d|%H|%M|%S|%L|%u|%U|%V|%z|%Z)/g);
  (0, import_internal.adjustDate)(date, minuteOffset);
  for (let i = 0, len = matches.length; i < len; i++) {
    const formatSpecifier = matches[i];
    const props = import_internal.DATE_SYM_TABLE[formatSpecifier];
    const operatorFn = DATE_FUNCTIONS[formatSpecifier];
    let value;
    if ((0, import_util.isObject)(props)) {
      if (props.name === "timezone") {
        value = (0, import_internal.formatTimezone)(minuteOffset);
      } else if (props.name === "minuteOffset") {
        value = minuteOffset.toString();
      } else {
        (0, import_util.assert)(
          !!operatorFn,
          `unsupported date format specifier '${formatSpecifier}'`
        );
        value = (0, import_internal.padDigits)(operatorFn(obj, date, options), props.padding);
      }
    }
    format = format.replace(formatSpecifier, value);
  }
  return format;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $dateToString
});
