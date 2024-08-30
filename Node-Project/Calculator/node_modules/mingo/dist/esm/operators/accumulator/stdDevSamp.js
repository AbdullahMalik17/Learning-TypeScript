import { isNumber } from "../../util";
import { stddev } from "./_internal";
import { $push } from "./push";
const $stdDevSamp = (collection, expr, options) => stddev($push(collection, expr, options).filter(isNumber), true);
export {
  $stdDevSamp
};
