import { computeValue } from "../../core";
import { $median as __median } from "../accumulator/median";
const $median = (obj, expr, options) => {
  const input = computeValue(obj, expr.input, null, options);
  return __median(input, { input: "$$CURRENT" }, options);
};
export {
  $median
};
