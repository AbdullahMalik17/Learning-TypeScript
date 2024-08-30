import { computeValue } from "../../../core";
import { assert, intersection, isArray } from "../../../util";
const $setIntersection = (obj, expr, options) => {
  const args = computeValue(obj, expr, null, options);
  assert(
    isArray(args) && args.every(isArray),
    "$setIntersection: expresssion must resolve to array of arrays"
  );
  return intersection(args, options?.hashFunction);
};
export {
  $setIntersection
};
