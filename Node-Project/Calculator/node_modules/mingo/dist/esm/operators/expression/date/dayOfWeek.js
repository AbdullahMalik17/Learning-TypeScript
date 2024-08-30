import { computeDate } from "./_internal";
const $dayOfWeek = (obj, expr, options) => {
  return computeDate(obj, expr, options).getUTCDay() + 1;
};
export {
  $dayOfWeek
};
