import { computeDate } from "./_internal";
const $year = (obj, expr, options) => {
  return computeDate(obj, expr, options).getUTCFullYear();
};
export {
  $year
};
