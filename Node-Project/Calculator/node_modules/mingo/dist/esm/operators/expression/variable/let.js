import {
  ComputeOptions,
  computeValue
} from "../../../core";
const $let = (obj, expr, options) => {
  const variables = {};
  for (const [key, val] of Object.entries(expr.vars)) {
    variables[key] = computeValue(obj, val, null, options);
  }
  return computeValue(
    obj,
    expr.in,
    null,
    ComputeOptions.init(options, obj, { variables })
  );
};
export {
  $let
};
