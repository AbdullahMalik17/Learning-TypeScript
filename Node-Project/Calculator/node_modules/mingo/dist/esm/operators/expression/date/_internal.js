import { computeValue } from "../../../core";
import { isDate, isNil, isNumber } from "../../../util";
const COMMON_YEAR_DAYS_OFFSET = [
  0,
  31,
  59,
  90,
  120,
  151,
  181,
  212,
  243,
  273,
  304,
  334
];
const LEAP_YEAR_DAYS_OFFSET = [
  0,
  31,
  60,
  91,
  121,
  152,
  182,
  213,
  244,
  274,
  305,
  335
];
const p = (y) => (y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400)) % 7;
const weeks = (y) => 52 + Number(p(y) == 4 || p(y - 1) == 3);
const isLeapYear = (year) => (year & 3) == 0 && (year % 100 != 0 || year % 400 == 0);
const getDayOfYear = (d) => (isLeapYear(d.getUTCFullYear()) ? LEAP_YEAR_DAYS_OFFSET : COMMON_YEAR_DAYS_OFFSET)[d.getUTCMonth()] + d.getUTCDate();
function isoWeek(d) {
  const w = Math.floor((10 + getDayOfYear(d) - (d.getUTCDay() || 7)) / 7);
  if (w < 1)
    return weeks(d.getUTCFullYear() - 1);
  if (w > weeks(d.getUTCFullYear()))
    return 1;
  return w;
}
function isoWeekYear(d) {
  return d.getUTCFullYear() - Number(d.getUTCMonth() == 0 && d.getUTCDate() == 1 && d.getUTCDay() < 1);
}
const MINUTES_PER_HOUR = 60;
const MILLIS_PER_DAY = 1e3 * 60 * 60 * 24;
const DURATION_IN_MILLIS = {
  week: MILLIS_PER_DAY * 7,
  day: MILLIS_PER_DAY,
  hour: 1e3 * 60 * 60,
  minute: 1e3 * 60,
  second: 1e3,
  millisecond: 1
};
const DATE_FORMAT = "%Y-%m-%dT%H:%M:%S.%LZ";
const DATE_PART_INTERVAL = [
  ["year", 0, 9999],
  ["month", 1, 12],
  ["day", 1, 31],
  ["hour", 0, 23],
  ["minute", 0, 59],
  ["second", 0, 59],
  ["millisecond", 0, 999]
];
const DATE_SYM_TABLE = {
  "%Y": { name: "year", padding: 4, re: /([0-9]{4})/ },
  "%G": { name: "year", padding: 4, re: /([0-9]{4})/ },
  "%m": { name: "month", padding: 2, re: /(0[1-9]|1[012])/ },
  "%d": { name: "day", padding: 2, re: /(0[1-9]|[12][0-9]|3[01])/ },
  "%H": { name: "hour", padding: 2, re: /([01][0-9]|2[0-3])/ },
  "%M": { name: "minute", padding: 2, re: /([0-5][0-9])/ },
  "%S": { name: "second", padding: 2, re: /([0-5][0-9]|60)/ },
  "%L": { name: "millisecond", padding: 3, re: /([0-9]{3})/ },
  "%u": { name: "weekday", padding: 1, re: /([1-7])/ },
  "%U": { name: "week", padding: 2, re: /([1-4][0-9]?|5[0-3]?)/ },
  "%V": { name: "isoWeek", padding: 2, re: /([1-4][0-9]?|5[0-3]?)/ },
  "%z": {
    name: "timezone",
    padding: 2,
    re: /(([+-][01][0-9]|2[0-3]):?([0-5][0-9])?)/
  },
  "%Z": { name: "minuteOffset", padding: 3, re: /([+-][0-9]{3})/ }
  // "%%": "%",
};
function parseTimezone(tzstr) {
  if (isNil(tzstr))
    return 0;
  const m = DATE_SYM_TABLE["%z"].re.exec(tzstr);
  if (!m)
    throw Error(`invalid or location-based timezone '${tzstr}' not supported`);
  const hr = parseInt(m[2]) || 0;
  const min = parseInt(m[3]) || 0;
  return (Math.abs(hr * MINUTES_PER_HOUR) + min) * (hr < 0 ? -1 : 1);
}
function formatTimezone(minuteOffset) {
  return (minuteOffset < 0 ? "-" : "+") + padDigits(Math.abs(Math.floor(minuteOffset / MINUTES_PER_HOUR)), 2) + padDigits(Math.abs(minuteOffset) % MINUTES_PER_HOUR, 2);
}
function adjustDate(d, minuteOffset) {
  d.setUTCMinutes(d.getUTCMinutes() + minuteOffset);
}
function computeDate(obj, expr, options) {
  const d = computeValue(obj, expr, null, options);
  if (isDate(d))
    return new Date(d);
  if (isNumber(d))
    return new Date(d * 1e3);
  if (d.date) {
    const date = isDate(d.date) ? new Date(d.date) : new Date(d.date * 1e3);
    if (d.timezone) {
      adjustDate(date, parseTimezone(d.timezone));
    }
    return date;
  }
  throw Error(`cannot convert ${expr?.toString()} to date`);
}
function padDigits(n, digits) {
  return new Array(Math.max(digits - String(n).length + 1, 0)).join("0") + n.toString();
}
function regexQuote(s) {
  "^.-*?$".split("").forEach((c) => {
    s = s.replace(c, `\\${c}`);
  });
  return s;
}
function regexStrip(s) {
  return s.replace(/^\//, "").replace(/\/$/, "");
}
export {
  DATE_FORMAT,
  DATE_PART_INTERVAL,
  DATE_SYM_TABLE,
  DURATION_IN_MILLIS,
  MILLIS_PER_DAY,
  MINUTES_PER_HOUR,
  adjustDate,
  computeDate,
  formatTimezone,
  getDayOfYear,
  isLeapYear,
  isoWeek,
  isoWeekYear,
  padDigits,
  parseTimezone,
  regexQuote,
  regexStrip
};
