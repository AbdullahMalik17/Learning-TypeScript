import { isNumber } from "../../util";
import { stddev } from "./_internal";
import { $push } from "./push";
const $stdDevPop = (collection, expr, options) => stddev($push(collection, expr, options).filter(isNumber), false);
export {
  $stdDevPop
};
