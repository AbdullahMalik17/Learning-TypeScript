import { computeDate, getDayOfYear } from "./_internal";
const $dayOfYear = (obj, expr, options) => {
  return getDayOfYear(computeDate(obj, expr, options));
};
export {
  $dayOfYear
};
