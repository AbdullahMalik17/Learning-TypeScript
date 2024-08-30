import { computeValue } from "../../../core";
import { assert, isArray, isNil } from "../../../util";
const $reverseArray = (obj, expr, options) => {
  const arr = computeValue(obj, expr, null, options);
  if (isNil(arr))
    return null;
  assert(isArray(arr), "$reverseArray expression must resolve to an array");
  const result = arr.slice(0);
  result.reverse();
  return result;
};
export {
  $reverseArray
};
