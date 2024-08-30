import { computeValue } from "../../../core";
import { isNil, isString } from "../../../util";
const $toBool = (obj, expr, options) => {
  const val = computeValue(obj, expr, null, options);
  if (isNil(val))
    return null;
  if (isString(val))
    return true;
  return Boolean(val);
};
export {
  $toBool
};
