import { computeValue } from "../../../core";
import { isEmpty } from "../../../util";
const $toLower = (obj, expr, options) => {
  const value = computeValue(obj, expr, null, options);
  return isEmpty(value) ? "" : value.toLowerCase();
};
export {
  $toLower
};
