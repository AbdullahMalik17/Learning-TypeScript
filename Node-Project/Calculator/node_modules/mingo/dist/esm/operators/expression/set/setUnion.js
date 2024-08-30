import { computeValue } from "../../../core";
import { assert, isArray, unique } from "../../../util";
const $setUnion = (obj, expr, options) => {
  const args = computeValue(obj, expr, null, options);
  assert(
    isArray(args) && args.length == 2 && args.every(isArray),
    "$setUnion: arguments must be arrays"
  );
  return unique(args[0].concat(args[1]), options?.hashFunction);
};
export {
  $setUnion
};
