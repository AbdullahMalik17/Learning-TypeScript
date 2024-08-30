import { computeDate } from "./_internal";
const $isoWeekYear = (obj, expr, options) => {
  const d = computeDate(obj, expr, options);
  return d.getUTCFullYear() - Number(d.getUTCMonth() == 0 && d.getUTCDate() == 1 && d.getUTCDay() < 1);
};
export {
  $isoWeekYear
};
