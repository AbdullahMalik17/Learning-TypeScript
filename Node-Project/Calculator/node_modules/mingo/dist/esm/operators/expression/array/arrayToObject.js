import { computeValue } from "../../../core";
import { assert, has, isArray, isObject } from "../../../util";
const $arrayToObject = (obj, expr, options) => {
  const arr = computeValue(obj, expr, null, options);
  assert(isArray(arr), "$arrayToObject expression must resolve to an array");
  return arr.reduce((newObj, val) => {
    while (isArray(val) && val.length === 1)
      val = val[0];
    if (val instanceof Array && val.length == 2) {
      newObj[val[0]] = val[1];
    } else {
      const valObj = val;
      assert(
        isObject(valObj) && has(valObj, "k") && has(valObj, "v"),
        "$arrayToObject expression is invalid."
      );
      newObj[valObj.k] = valObj.v;
    }
    return newObj;
  }, {});
};
export {
  $arrayToObject
};
