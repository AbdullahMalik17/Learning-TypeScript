import { compare, isNotNaN } from "../../util";
import { $push } from "./push";
const $max = (collection, expr, options) => {
  const nums = $push(collection, expr, options).filter(isNotNaN);
  const n = nums.reduce(
    (acc, n2) => compare(n2, acc) >= 0 ? n2 : acc,
    -Infinity
  );
  return n === -Infinity ? void 0 : n;
};
export {
  $max
};
