import { computeDate } from "./_internal";
const $minute = (obj, expr, options) => {
  return computeDate(obj, expr, options).getUTCMinutes();
};
export {
  $minute
};
