import { computeValue } from "../../../core";
import { isNil } from "../../../util";
import { TypeConvertError } from "./_internal";
const $toDate = (obj, expr, options) => {
  const val = computeValue(obj, expr, null, options);
  if (val instanceof Date)
    return val;
  if (isNil(val))
    return null;
  const d = new Date(val);
  const n = d.getTime();
  if (!isNaN(n))
    return d;
  throw new TypeConvertError(`cannot convert '${val}' to date`);
};
export {
  $toDate
};
