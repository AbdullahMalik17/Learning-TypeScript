import { MAX_LONG, MIN_LONG } from "../../../util";
import { toInteger } from "./_internal";
const $toLong = (obj, expr, options) => {
  return toInteger(obj, expr, options, MAX_LONG, MIN_LONG, "long");
};
export {
  $toLong
};
