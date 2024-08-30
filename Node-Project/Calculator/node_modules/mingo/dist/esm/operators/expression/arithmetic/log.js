import { computeValue } from "../../../core";
import { assert, isArray, isNil, isNumber } from "../../../util";
const $log = (obj, expr, options) => {
  const args = computeValue(obj, expr, null, options);
  const msg = "$log expression must resolve to array(2) of numbers";
  assert(isArray(args) && args.length === 2, msg);
  if (args.some(isNil))
    return null;
  assert(args.some(isNaN) || args.every(isNumber), msg);
  return Math.log10(args[0]) / Math.log10(args[1]);
};
export {
  $log
};
