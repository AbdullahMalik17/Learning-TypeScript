import { computeValue } from "../../../core";
import { assert, isNil } from "../../../util";
const $slice = (obj, expr, options) => {
  const args = computeValue(obj, expr, null, options);
  const arr = args[0];
  let skip = args[1];
  let limit = args[2];
  if (isNil(limit)) {
    if (skip < 0) {
      skip = Math.max(0, arr.length + skip);
      limit = arr.length - skip + 1;
    } else {
      limit = skip;
      skip = 0;
    }
  } else {
    if (skip < 0) {
      skip = Math.max(0, arr.length + skip);
    }
    assert(
      limit > 0,
      `Invalid argument for $slice operator. Limit must be a positive number`
    );
    limit += skip;
  }
  return arr.slice(skip, limit);
};
export {
  $slice
};
