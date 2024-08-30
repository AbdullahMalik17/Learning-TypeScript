import { computeValue } from "../../../core";
const $strLenCP = (obj, expr, options) => {
  return computeValue(obj, expr, null, options).length;
};
export {
  $strLenCP
};
