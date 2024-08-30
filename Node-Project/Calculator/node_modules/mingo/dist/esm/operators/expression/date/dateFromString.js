import { computeValue } from "../../../core";
import { assert, isNil, isObject } from "../../../util";
import {
  adjustDate,
  DATE_FORMAT,
  DATE_SYM_TABLE,
  MINUTES_PER_HOUR,
  parseTimezone,
  regexQuote,
  regexStrip
} from "./_internal";
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
  const args = computeValue(obj, expr, null, options);
  args.format = args.format || DATE_FORMAT;
  args.onNull = args.onNull || null;
  let dateString = args.dateString;
  if (isNil(dateString))
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
    const props = DATE_SYM_TABLE[formatSpecifier];
    if (isObject(props)) {
      const m2 = props.re.exec(dateString);
      const delimiter = separators.pop() || "";
      if (m2 !== null) {
        dateParts[props.name] = /^\d+$/.exec(m2[0]) ? parseInt(m2[0]) : m2[0];
        dateString = dateString.substr(0, m2.index) + dateString.substr(m2.index + m2[0].length);
        expectedPattern += regexQuote(delimiter) + regexStrip(props.re.toString());
      } else {
        dateParts[props.name] = null;
      }
    }
  }
  if (isNil(dateParts.year) || isNil(dateParts.month) || isNil(dateParts.day) || !new RegExp("^" + expectedPattern + "[A-Z]?$").exec(args.dateString)) {
    return args.onError;
  }
  const m = args.dateString.match(/([A-Z])$/);
  assert(
    // only one of in-date timeone or timezone argument but not both.
    !(m && args.timezone),
    `$dateFromString: you cannot pass in a date/time string with time zone information ('${m && m[0]}') together with a timezone argument`
  );
  const minuteOffset = m ? TZ_LETTER_OFFSETS[m[0]] * MINUTES_PER_HOUR : parseTimezone(args.timezone);
  const d = new Date(
    Date.UTC(dateParts.year, dateParts.month - 1, dateParts.day, 0, 0, 0)
  );
  if (!isNil(dateParts.hour))
    d.setUTCHours(dateParts.hour);
  if (!isNil(dateParts.minute))
    d.setUTCMinutes(dateParts.minute);
  if (!isNil(dateParts.second))
    d.setUTCSeconds(dateParts.second);
  if (!isNil(dateParts.millisecond))
    d.setUTCMilliseconds(dateParts.millisecond);
  adjustDate(d, -minuteOffset);
  return d;
};
export {
  $dateFromString
};
