import { computeValue } from "../../../core";
import { truthy } from "../../../util";
const $anyElementTrue = (obj, expr, options) => {
  const args = computeValue(obj, expr, null, options)[0];
  return args.some((v) => truthy(v, options.useStrictMode));
};
export {
  $anyElementTrue
};
