import { computeValue } from "../../../core";
import { truthy } from "../../../util";
const $or = (obj, expr, options) => {
  const value = computeValue(obj, expr, null, options);
  const strict = options.useStrictMode;
  return truthy(value, strict) && value.some((v) => truthy(v, strict));
};
export {
  $or
};
