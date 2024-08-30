import { computeValue } from "../../../core";
import { isNil } from "../../../util";
const $atan2 = (obj, expr, options) => {
  const [y, x] = computeValue(obj, expr, null, options);
  if (isNaN(y) || isNil(y))
    return y;
  if (isNaN(x) || isNil(x))
    return x;
  return Math.atan2(y, x);
};
export {
  $atan2
};
