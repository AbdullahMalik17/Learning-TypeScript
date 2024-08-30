import { computeValue } from "../../../core";
import { assert, isArray, isNil } from "../../../util";
import { $maxN as __maxN } from "../../accumulator/maxN";
const $maxN = (obj, expr, options) => {
  if (obj instanceof Array)
    return __maxN(obj, expr, options);
  const { input, n } = computeValue(obj, expr, null, options);
  if (isNil(input))
    return null;
  assert(isArray(input), "Must resolve to an array/null or missing");
  return __maxN(input, { n, input: "$$this" }, options);
};
export {
  $maxN
};
