import { computeDate } from "./_internal";
const $hour = (obj, expr, options) => {
  return computeDate(obj, expr, options).getUTCHours();
};
export {
  $hour
};
