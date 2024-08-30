import { computeDate } from "./_internal";
const $month = (obj, expr, options) => {
  return computeDate(obj, expr, options).getUTCMonth() + 1;
};
export {
  $month
};
