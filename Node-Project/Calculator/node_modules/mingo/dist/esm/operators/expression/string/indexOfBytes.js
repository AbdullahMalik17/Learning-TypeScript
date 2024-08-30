import { computeValue } from "../../../core";
import { assert, isNil, isNumber, isString } from "../../../util";
const $indexOfBytes = (obj, expr, options) => {
  const arr = computeValue(obj, expr, null, options);
  const errorMsg = "$indexOfBytes expression resolves to invalid an argument";
  if (isNil(arr[0]))
    return null;
  assert(isString(arr[0]) && isString(arr[1]), errorMsg);
  const str = arr[0];
  const searchStr = arr[1];
  let start = arr[2];
  let end = arr[3];
  let valid = isNil(start) || isNumber(start) && start >= 0 && Math.round(start) === start;
  valid = valid && (isNil(end) || isNumber(end) && end >= 0 && Math.round(end) === end);
  assert(valid, errorMsg);
  start = start || 0;
  end = end || str.length;
  if (start > end)
    return -1;
  const index = str.substring(start, end).indexOf(searchStr);
  return index > -1 ? index + start : index;
};
export {
  $indexOfBytes
};
