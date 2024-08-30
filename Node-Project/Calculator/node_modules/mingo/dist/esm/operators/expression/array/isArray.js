import { computeValue } from "../../../core";
const $isArray = (obj, expr, options) => {
  return computeValue(obj, expr[0], null, options) instanceof Array;
};
export {
  $isArray
};
