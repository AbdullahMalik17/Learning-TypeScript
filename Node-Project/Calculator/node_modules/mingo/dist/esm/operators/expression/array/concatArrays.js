import { computeValue } from "../../../core";
import { assert, into, isArray, isNil } from "../../../util";
const $concatArrays = (obj, expr, options) => {
  const arr = computeValue(obj, expr, null, options);
  assert(isArray(arr), "$concatArrays must resolve to an array");
  if (arr.some(isNil))
    return null;
  return arr.reduce((acc, item) => into(acc, item), []);
};
export {
  $concatArrays
};
