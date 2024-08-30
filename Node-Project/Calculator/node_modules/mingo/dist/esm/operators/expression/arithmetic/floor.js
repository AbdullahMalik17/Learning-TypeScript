import { computeValue } from "../../../core";
import { assert, isNil, isNumber } from "../../../util";
const $floor = (obj, expr, options) => {
  const n = computeValue(obj, expr, null, options);
  if (isNil(n))
    return null;
  assert(
    isNumber(n) || isNaN(n),
    "$floor expression must resolve to a number."
  );
  return Math.floor(n);
};
export {
  $floor
};
