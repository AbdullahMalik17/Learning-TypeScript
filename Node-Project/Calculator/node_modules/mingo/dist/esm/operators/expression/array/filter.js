import {
  ComputeOptions,
  computeValue
} from "../../../core";
import { assert, isArray, truthy } from "../../../util";
const $filter = (obj, expr, options) => {
  const input = computeValue(obj, expr.input, null, options);
  assert(isArray(input), "$filter 'input' expression must resolve to an array");
  const copts = ComputeOptions.init(options, obj);
  const k = expr.as || "this";
  const local = {
    variables: { [k]: null }
  };
  return input.filter((o) => {
    local.variables[k] = o;
    const b = computeValue(
      obj,
      expr.cond,
      null,
      copts.update(copts.root, local)
    );
    return truthy(b, options.useStrictMode);
  });
};
export {
  $filter
};
