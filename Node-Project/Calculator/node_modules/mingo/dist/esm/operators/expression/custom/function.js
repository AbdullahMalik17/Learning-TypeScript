import { computeValue } from "../../../core";
import { assert } from "../../../util";
const $function = (obj, expr, options) => {
  assert(
    options.scriptEnabled,
    "$function operator requires 'scriptEnabled' option to be true"
  );
  const fn = computeValue(obj, expr, null, options);
  return fn.body.apply(null, fn.args);
};
export {
  $function
};
