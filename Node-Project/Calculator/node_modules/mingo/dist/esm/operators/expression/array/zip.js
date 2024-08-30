import { computeValue } from "../../../core";
import { assert, isArray, isBoolean, isNil } from "../../../util";
const $zip = (obj, expr, options) => {
  const inputs = computeValue(
    obj,
    expr.inputs,
    null,
    options
  );
  const useLongestLength = expr.useLongestLength || false;
  assert(isArray(inputs), "'inputs' expression must resolve to an array");
  assert(isBoolean(useLongestLength), "'useLongestLength' must be a boolean");
  if (isArray(expr.defaults)) {
    assert(
      useLongestLength,
      "'useLongestLength' must be set to true to use 'defaults'"
    );
  }
  let zipCount = 0;
  for (let i = 0, len = inputs.length; i < len; i++) {
    const arr = inputs[i];
    if (isNil(arr))
      return null;
    assert(
      isArray(arr),
      "'inputs' expression values must resolve to an array or null"
    );
    zipCount = useLongestLength ? Math.max(zipCount, arr.length) : Math.min(zipCount || arr.length, arr.length);
  }
  const result = [];
  const defaults = expr.defaults || [];
  for (let i = 0; i < zipCount; i++) {
    const temp = inputs.map((val, index) => {
      return isNil(val[i]) ? defaults[index] || null : val[i];
    });
    result.push(temp);
  }
  return result;
};
export {
  $zip
};
