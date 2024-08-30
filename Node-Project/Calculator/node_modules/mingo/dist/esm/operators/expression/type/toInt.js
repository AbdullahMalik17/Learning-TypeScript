import { MAX_INT, MIN_INT } from "../../../util";
import { toInteger } from "./_internal";
const $toInt = (obj, expr, options) => {
  return toInteger(obj, expr, options, MAX_INT, MIN_INT, "int");
};
export {
  $toInt
};
