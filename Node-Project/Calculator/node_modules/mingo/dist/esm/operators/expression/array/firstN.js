import { computeValue } from "../../../core";
import { assert, isArray, isNil } from "../../../util";
import { $firstN as __firstN } from "../../accumulator/firstN";
const $firstN = (obj, expr, options) => {
  if (obj instanceof Array)
    return __firstN(obj, expr, options);
  const { input, n } = computeValue(obj, expr, null, options);
  if (isNil(input))
    return null;
  assert(isArray(input), "Must resolve to an array/null or missing");
  return __firstN(input, { n, input: "$$this" }, options);
};
export {
  $firstN
};
