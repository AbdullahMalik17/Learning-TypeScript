import { computeValue } from "../../../core";
import { isString } from "../../../util";
const $substr = (obj, expr, options) => {
  const args = computeValue(obj, expr, null, options);
  const s = args[0];
  const index = args[1];
  const count = args[2];
  if (isString(s)) {
    if (index < 0) {
      return "";
    } else if (count < 0) {
      return s.substr(index);
    } else {
      return s.substr(index, count);
    }
  }
  return "";
};
export {
  $substr
};
