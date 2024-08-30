import { computeValue } from "../../../core";
import { notInArray } from "../../../util";
const $setDifference = (obj, expr, options) => {
  const args = computeValue(obj, expr, null, options);
  return args[0].filter(notInArray.bind(null, args[1]));
};
export {
  $setDifference
};
