import { computeValue } from "../../../core";
import { assert, isEqual, isNil, isString } from "../../../util";
const $strcasecmp = (obj, expr, options) => {
  const args = computeValue(obj, expr, null, options);
  let a = args[0];
  let b = args[1];
  if (isEqual(a, b) || args.every(isNil))
    return 0;
  assert(
    args.every(isString),
    "$strcasecmp must resolve to array(2) of strings"
  );
  a = a.toUpperCase();
  b = b.toUpperCase();
  return a > b && 1 || a < b && -1 || 0;
};
export {
  $strcasecmp
};
