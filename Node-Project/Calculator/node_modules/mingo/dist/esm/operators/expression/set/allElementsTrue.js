import { computeValue } from "../../../core";
import { truthy } from "../../../util";
const $allElementsTrue = (obj, expr, options) => {
  const args = computeValue(obj, expr, null, options)[0];
  return args.every((v) => truthy(v, options.useStrictMode));
};
export {
  $allElementsTrue
};
