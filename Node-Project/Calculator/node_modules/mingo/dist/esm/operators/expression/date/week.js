import { computeDate, isoWeek } from "./_internal";
const $week = (obj, expr, options) => {
  const d = computeDate(obj, expr, options);
  const result = isoWeek(d);
  if (d.getUTCDay() > 0 && d.getUTCDate() == 1 && d.getUTCMonth() == 0)
    return 0;
  if (d.getUTCDay() == 0)
    return result + 1;
  return result;
};
export {
  $week
};
