import { isNumber } from "../../util";
import { $push } from "./push";
const $avg = (collection, expr, options) => {
  const data = $push(collection, expr, options).filter(isNumber);
  const sum = data.reduce((acc, n) => acc + n, 0);
  return sum / (data.length || 1);
};
export {
  $avg
};
