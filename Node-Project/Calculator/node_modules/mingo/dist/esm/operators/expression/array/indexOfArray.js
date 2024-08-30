import { computeValue } from "../../../core";
import { assert, isArray, isEqual, isNil } from "../../../util";
const $indexOfArray = (obj, expr, options) => {
  const args = computeValue(obj, expr, null, options);
  if (isNil(args))
    return null;
  let arr = args[0];
  const searchValue = args[1];
  if (isNil(arr))
    return null;
  assert(isArray(arr), "$indexOfArray expression must resolve to an array.");
  const start = args[2] || 0;
  let end = args[3];
  if (isNil(end))
    end = arr.length;
  if (start > end)
    return -1;
  assert(start >= 0 && end >= 0, "$indexOfArray expression is invalid");
  if (start > 0 || end < arr.length) {
    arr = arr.slice(start, end);
  }
  let index = -1;
  arr.some((v, i) => {
    const b = isEqual(v, searchValue);
    if (b)
      index = i;
    return b;
  });
  return index + start;
};
export {
  $indexOfArray
};
