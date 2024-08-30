import { computeValue } from "../../../core";
const $multiply = (obj, expr, options) => {
  const args = computeValue(obj, expr, null, options);
  return args.reduce((acc, num) => acc * num, 1);
};
export {
  $multiply
};
