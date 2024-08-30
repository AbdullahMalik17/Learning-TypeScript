import { computeDate } from "./_internal";
const $second = (obj, expr, options) => {
  return computeDate(obj, expr, options).getUTCSeconds();
};
export {
  $second
};
