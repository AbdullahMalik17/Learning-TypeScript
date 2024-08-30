import { computeValue } from "../../../core";
import { assert, isNil, isNumber } from "../../../util";
const $ceil = (obj, expr, options) => {
  const n = computeValue(obj, expr, null, options);
  if (isNil(n))
    return null;
  assert(isNumber(n) || isNaN(n), "$ceil expression must resolve to a number.");
  return Math.ceil(n);
};
export {
  $ceil
};
