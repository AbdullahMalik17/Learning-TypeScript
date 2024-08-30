import { isArray, isNumber } from "../../util";
import { $push } from "./push";
const $sum = (collection, expr, options) => {
  if (!isArray(collection))
    return 0;
  if (isNumber(expr))
    return collection.length * expr;
  const nums = $push(collection, expr, options).filter(isNumber);
  return nums.reduce((acc, n) => acc + n, 0);
};
export {
  $sum
};
