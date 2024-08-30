import { computeValue } from "../../../core";
import { assert, isNil, isNumber } from "../../../util";
const $ln = (obj, expr, options) => {
  const n = computeValue(obj, expr, null, options);
  if (isNil(n))
    return null;
  assert(isNumber(n) || isNaN(n), "$ln expression must resolve to a number.");
  return Math.log(n);
};
export {
  $ln
};
