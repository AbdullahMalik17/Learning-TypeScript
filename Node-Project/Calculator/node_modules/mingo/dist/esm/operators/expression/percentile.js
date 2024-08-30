import { computeValue } from "../../core";
import { $percentile as __percentile } from "../accumulator/percentile";
const $percentile = (obj, expr, options) => {
  const input = computeValue(obj, expr.input, null, options);
  return __percentile(input, { ...expr, input: "$$CURRENT" }, options);
};
export {
  $percentile
};
