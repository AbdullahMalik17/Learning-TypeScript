import { computeValue } from "../../../core";
const $cmp = (obj, expr, options) => {
  const args = computeValue(obj, expr, null, options);
  if (args[0] > args[1])
    return 1;
  if (args[0] < args[1])
    return -1;
  return 0;
};
export {
  $cmp
};
