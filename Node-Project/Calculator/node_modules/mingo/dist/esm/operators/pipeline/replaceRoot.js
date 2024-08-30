import { computeValue } from "../../core";
import { assert, isObject } from "../../util";
const $replaceRoot = (collection, expr, options) => {
  return collection.map((obj) => {
    obj = computeValue(obj, expr.newRoot, null, options);
    assert(isObject(obj), "$replaceRoot expression must return an object");
    return obj;
  });
};
export {
  $replaceRoot
};
