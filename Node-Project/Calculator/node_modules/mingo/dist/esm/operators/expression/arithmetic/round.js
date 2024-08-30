import { computeValue } from "../../../core";
import { assert, isNil, isNumber } from "../../../util";
import { truncate } from "./_internal";
const $round = (obj, expr, options) => {
  const args = computeValue(obj, expr, null, options);
  const num = args[0];
  const place = args[1];
  if (isNil(num) || isNaN(num) || Math.abs(num) === Infinity)
    return num;
  assert(isNumber(num), "$round expression must resolve to a number.");
  return truncate(num, place, true);
};
export {
  $round
};
