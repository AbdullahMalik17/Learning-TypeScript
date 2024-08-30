import { computeValue } from "../../../core";
import { assert, isObject } from "../../../util";
const $objectToArray = (obj, expr, options) => {
  const val = computeValue(obj, expr, null, options);
  assert(isObject(val), "$objectToArray expression must resolve to an object");
  const entries = Object.entries(val);
  const result = new Array(entries.length);
  let i = 0;
  for (const [k, v] of entries) {
    result[i++] = { k, v };
  }
  return result;
};
export {
  $objectToArray
};
