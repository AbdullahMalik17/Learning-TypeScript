import { computeValue } from "../../../core";
import { truthy } from "../../../util";
const $and = (obj, expr, options) => {
  const value = computeValue(obj, expr, null, options);
  return truthy(value, options.useStrictMode) && value.every((v) => truthy(v, options.useStrictMode));
};
export {
  $and
};
