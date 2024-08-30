import {
  ComputeOptions,
  computeValue
} from "../../../core";
import { assert, isArray } from "../../../util";
const $map = (obj, expr, options) => {
  const input = computeValue(obj, expr.input, null, options);
  assert(isArray(input), `$map 'input' expression must resolve to an array`);
  const copts = ComputeOptions.init(options);
  const k = expr.as || "this";
  return input.map((o) => {
    return computeValue(
      obj,
      expr.in,
      null,
      copts.update(copts.root, {
        variables: { [k]: o }
      })
    );
  });
};
export {
  $map
};
