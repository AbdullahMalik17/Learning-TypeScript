import { computeValue } from "../../../core";
import {
  DATE_PART_INTERVAL,
  isLeapYear,
  MINUTES_PER_HOUR,
  parseTimezone
} from "./_internal";
const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const getDaysInMonth = (date) => {
  return date.month == 2 && isLeapYear(date.year) ? 29 : DAYS_IN_MONTH[date.month - 1];
};
const $dateFromParts = (obj, expr, options) => {
  const args = computeValue(obj, expr, null, options);
  const minuteOffset = parseTimezone(args.timezone);
  for (let i = DATE_PART_INTERVAL.length - 1, remainder = 0; i >= 0; i--) {
    const datePartInterval = DATE_PART_INTERVAL[i];
    const k = datePartInterval[0];
    const min = datePartInterval[1];
    const max = datePartInterval[2];
    let part = (args[k] || 0) + remainder;
    remainder = 0;
    const limit = max + 1;
    if (k == "hour")
      part += Math.floor(minuteOffset / MINUTES_PER_HOUR) * -1;
    if (k == "minute")
      part += minuteOffset % MINUTES_PER_HOUR * -1;
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
export {
  $dateFromParts
};
