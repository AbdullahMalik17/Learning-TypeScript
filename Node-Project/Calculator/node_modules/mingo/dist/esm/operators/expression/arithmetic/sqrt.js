import { computeValue } from "../../../core";
import { assert, isNil, isNumber } from "../../../util";
const $sqrt = (obj, expr, options) => {
  const n = computeValue(obj, expr, null, options);
  if (isNil(n))
    return null;
  assert(
    isNumber(n) && n > 0 || isNaN(n),
    "$sqrt expression must resolve to non-negative number."
  );
  return Math.sqrt(n);
};
export {
  $sqrt
};
