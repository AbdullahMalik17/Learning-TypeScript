import {
  ComputeOptions,
  computeValue
} from "../../../core";
import { assert, isArray, isNil } from "../../../util";
const $reduce = (obj, expr, options) => {
  const copts = ComputeOptions.init(options);
  const input = computeValue(obj, expr.input, null, copts);
  const initialValue = computeValue(obj, expr.initialValue, null, copts);
  const inExpr = expr["in"];
  if (isNil(input))
    return null;
  assert(isArray(input), "$reduce 'input' expression must resolve to an array");
  return input.reduce((acc, n) => {
    return computeValue(
      n,
      inExpr,
      null,
      copts.update(copts.root, {
        variables: { value: acc }
      })
    );
  }, initialValue);
};
export {
  $reduce
};
