import { computeValue } from "../../../core";
import { assert, isDate } from "../../../util";
const $add = (obj, expr, options) => {
  const args = computeValue(obj, expr, null, options);
  let foundDate = false;
  const result = args.reduce((acc, val) => {
    if (isDate(val)) {
      assert(!foundDate, "'$add' can only have one date value");
      foundDate = true;
      val = val.getTime();
    }
    acc += val;
    return acc;
  }, 0);
  return foundDate ? new Date(result) : result;
};
export {
  $add
};
