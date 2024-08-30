import { computeValue } from "../../../core";
import { assert, isNil, isString } from "../../../util";
const $split = (obj, expr, options) => {
  const args = computeValue(obj, expr, null, options);
  if (isNil(args[0]))
    return null;
  assert(
    args.every(isString),
    "$split expression must result to array(2) of strings"
  );
  return args[0].split(args[1]);
};
export {
  $split
};
