import { computeValue } from "../../../core";
import { assert, isArray, isEqual } from "../../../util";
const $in = (obj, expr, options) => {
  const [item, arr] = computeValue(obj, expr, null, options);
  assert(isArray(arr), "$in second argument must be an array");
  return arr.some(isEqual.bind(null, item));
};
export {
  $in
};
