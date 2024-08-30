import { computeValue } from "../../../core";
import { assert, isNil, isObject } from "../../../util";
import {
  adjustDate,
  computeDate,
  DATE_FORMAT,
  DATE_SYM_TABLE,
  formatTimezone,
  padDigits,
  parseTimezone
} from "./_internal";
import { $dayOfMonth } from "./dayOfMonth";
import { $hour } from "./hour";
import { $isoDayOfWeek } from "./isoDayOfWeek";
import { $isoWeek } from "./isoWeek";
import { $millisecond } from "./millisecond";
import { $minute } from "./minute";
import { $month } from "./month";
import { $second } from "./second";
import { $week } from "./week";
import { $year } from "./year";
const DATE_FUNCTIONS = {
  "%Y": $year,
  "%G": $year,
  "%m": $month,
  "%d": $dayOfMonth,
  "%H": $hour,
  "%M": $minute,
  "%S": $second,
  "%L": $millisecond,
  "%u": $isoDayOfWeek,
  "%U": $week,
  "%V": $isoWeek
};
const $dateToString = (obj, expr, options) => {
  const args = computeValue(obj, expr, null, options);
  if (isNil(args.onNull))
    args.onNull = null;
  if (isNil(args.date))
    return args.onNull;
  const date = computeDate(obj, args.date, options);
  let format = args.format || DATE_FORMAT;
  const minuteOffset = parseTimezone(args.timezone);
  const matches = format.match(/(%%|%Y|%G|%m|%d|%H|%M|%S|%L|%u|%U|%V|%z|%Z)/g);
  adjustDate(date, minuteOffset);
  for (let i = 0, len = matches.length; i < len; i++) {
    const formatSpecifier = matches[i];
    const props = DATE_SYM_TABLE[formatSpecifier];
    const operatorFn = DATE_FUNCTIONS[formatSpecifier];
    let value;
    if (isObject(props)) {
      if (props.name === "timezone") {
        value = formatTimezone(minuteOffset);
      } else if (props.name === "minuteOffset") {
        value = minuteOffset.toString();
      } else {
        assert(
          !!operatorFn,
          `unsupported date format specifier '${formatSpecifier}'`
        );
        value = padDigits(operatorFn(obj, date, options), props.padding);
      }
    }
    format = format.replace(formatSpecifier, value);
  }
  return format;
};
export {
  $dateToString
};
