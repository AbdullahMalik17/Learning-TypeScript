import { computeValue } from "../../../core";
import { assert, isNil, isNumber } from "../../../util";
import { truncate } from "./_internal";
const $trunc = (obj, expr, options) => {
  const arr = computeValue(obj, expr, null, options);
  const num = arr[0];
  const places = arr[1];
  if (isNil(num) || isNaN(num) || Math.abs(num) === Infinity)
    return num;
  assert(isNumber(num), "$trunc expression must resolve to a number.");
  assert(
    isNil(places) || isNumber(places) && places > -20 && places < 100,
    "$trunc expression has invalid place"
  );
  return truncate(num, places, false);
};
export {
  $trunc
};
