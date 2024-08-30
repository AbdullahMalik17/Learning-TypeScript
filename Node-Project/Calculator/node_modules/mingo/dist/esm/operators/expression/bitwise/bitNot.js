import { computeValue } from "../../../core";
import { isNil, isNumber, MingoError } from "../../../util";
const $bitNot = (obj, expr, options) => {
  const n = computeValue(obj, expr, null, options);
  if (isNil(n))
    return null;
  if (isNumber(n))
    return ~n;
  throw new MingoError("$bitNot: expression must evaluate to a number.");
};
export {
  $bitNot
};
