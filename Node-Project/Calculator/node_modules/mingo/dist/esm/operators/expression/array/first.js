import {
  ComputeOptions,
  computeValue
} from "../../../core";
import { assert, isArray, isNil } from "../../../util";
import { $first as __first } from "../../accumulator";
const $first = (obj, expr, options) => {
  const copts = ComputeOptions.init(options);
  if (obj instanceof Array)
    return __first(obj, expr, copts.update());
  const arr = computeValue(obj, expr, null, options);
  if (isNil(arr))
    return null;
  assert(isArray(arr), "Must resolve to an array/null or missing");
  return __first(arr, "$$this", options);
};
export {
  $first
};
