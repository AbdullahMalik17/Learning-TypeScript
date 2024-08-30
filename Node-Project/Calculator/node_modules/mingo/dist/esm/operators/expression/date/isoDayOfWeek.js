import { computeDate } from "./_internal";
const $isoDayOfWeek = (obj, expr, options) => {
  return computeDate(obj, expr, options).getUTCDay() || 7;
};
export {
  $isoDayOfWeek
};
