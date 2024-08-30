import { computeValue } from "../../../core";
import { assert, isArray, isNil } from "../../../util";
import { $minN as __minN } from "../../accumulator/minN";
const $minN = (obj, expr, options) => {
  if (obj instanceof Array)
    return __minN(obj, expr, options);
  const { input, n } = computeValue(obj, expr, null, options);
  if (isNil(input))
    return null;
  assert(isArray(input), "Must resolve to an array/null or missing");
  return __minN(input, { n, input: "$$this" }, options);
};
export {
  $minN
};
