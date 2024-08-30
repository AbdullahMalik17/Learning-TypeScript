import { computeValue } from "../../../core";
import { isEmpty } from "../../../util";
const $toUpper = (obj, expr, options) => {
  const value = computeValue(obj, expr, null, options);
  return isEmpty(value) ? "" : value.toUpperCase();
};
export {
  $toUpper
};
