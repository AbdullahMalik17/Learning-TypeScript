import { computeValue } from "../../../core";
import { isArray } from "../../../util";
const $size = (obj, expr, options) => {
  const value = computeValue(obj, expr, null, options);
  return isArray(value) ? value.length : void 0;
};
export {
  $size
};
