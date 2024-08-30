import { computeDate } from "./_internal";
const $millisecond = (obj, expr, options) => {
  return computeDate(obj, expr, options).getUTCMilliseconds();
};
export {
  $millisecond
};
