import { computeValue } from "../../../core";
import { assert, isNil, isNumber } from "../../../util";
const $log10 = (obj, expr, options) => {
  const n = computeValue(obj, expr, null, options);
  if (isNil(n))
    return null;
  assert(
    isNumber(n) || isNaN(n),
    "$log10 expression must resolve to a number."
  );
  return Math.log10(n);
};
export {
  $log10
};
