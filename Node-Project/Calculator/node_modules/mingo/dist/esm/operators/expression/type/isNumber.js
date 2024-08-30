import { computeValue } from "../../../core";
import { isNumber } from "../../../util";
const $isNumber = (obj, expr, options) => {
  const n = computeValue(obj, expr, null, options);
  return isNumber(n);
};
export {
  $isNumber
};
