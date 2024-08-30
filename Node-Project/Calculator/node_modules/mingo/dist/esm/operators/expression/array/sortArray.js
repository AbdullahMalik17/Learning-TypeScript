import { Aggregator } from "../../../aggregator";
import { computeValue } from "../../../core";
import { assert, compare, isArray, isNil, isObject } from "../../../util";
const $sortArray = (obj, expr, options) => {
  const { input, sortBy } = computeValue(obj, expr, null, options);
  if (isNil(input))
    return null;
  assert(isArray(input), "$sortArray expression must resolve to an array");
  if (isObject(sortBy)) {
    return new Aggregator([{ $sort: sortBy }]).run(input);
  }
  const result = [...input];
  result.sort(compare);
  if (sortBy === -1)
    result.reverse();
  return result;
};
export {
  $sortArray
};
