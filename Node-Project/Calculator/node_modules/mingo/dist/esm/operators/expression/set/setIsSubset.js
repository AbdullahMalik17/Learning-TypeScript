import { computeValue } from "../../../core";
import { intersection } from "../../../util";
const $setIsSubset = (obj, expr, options) => {
  const args = computeValue(obj, expr, null, options);
  return intersection(args, options?.hashFunction).length === args[0].length;
};
export {
  $setIsSubset
};
