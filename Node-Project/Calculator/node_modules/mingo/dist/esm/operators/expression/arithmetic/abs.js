import { computeValue } from "../../../core";
import { isNil } from "../../../util";
const $abs = (obj, expr, options) => {
  const n = computeValue(obj, expr, null, options);
  return isNil(n) ? null : Math.abs(n);
};
export {
  $abs
};
