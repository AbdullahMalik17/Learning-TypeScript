import { computeValue } from "../../../core";
import { assert, isArray, isNil } from "../../../util";
import { $lastN as __lastN } from "../../accumulator/lastN";
const $lastN = (obj, expr, options) => {
  if (obj instanceof Array)
    return __lastN(obj, expr, options);
  const { input, n } = computeValue(obj, expr, null, options);
  if (isNil(input))
    return null;
  assert(isArray(input), "Must resolve to an array/null or missing");
  return __lastN(input, { n, input: "$$this" }, options);
};
export {
  $lastN
};
