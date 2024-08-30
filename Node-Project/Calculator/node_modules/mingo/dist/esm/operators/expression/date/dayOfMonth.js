import { computeDate } from "./_internal";
const $dayOfMonth = (obj, expr, options) => {
  return computeDate(obj, expr, options).getUTCDate();
};
export {
  $dayOfMonth
};
