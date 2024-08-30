import { computeValue } from "../../../core";
import { isNil, isNumber } from "../../../util";
import { TypeConvertError } from "./_internal";
const $toDouble = (obj, expr, options) => {
  const val = computeValue(obj, expr, null, options);
  if (isNil(val))
    return null;
  if (val instanceof Date)
    return val.getTime();
  if (val === true)
    return 1;
  if (val === false)
    return 0;
  const n = Number(val);
  if (isNumber(n))
    return n;
  throw new TypeConvertError(`cannot convert '${val}' to double/decimal`);
};
export {
  $toDouble
};
