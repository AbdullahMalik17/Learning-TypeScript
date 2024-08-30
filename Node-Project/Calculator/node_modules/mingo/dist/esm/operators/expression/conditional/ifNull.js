import { computeValue } from "../../../core";
import { isNil } from "../../../util";
const $ifNull = (obj, expr, options) => {
  const args = computeValue(obj, expr, null, options);
  return args.find((arg) => !isNil(arg));
};
export {
  $ifNull
};
