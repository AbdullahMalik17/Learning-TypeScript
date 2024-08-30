import { computeValue } from "../../../core";
import { inArray } from "../../../util";
const $concat = (obj, expr, options) => {
  const args = computeValue(obj, expr, null, options);
  if ([null, void 0].some(inArray.bind(null, args)))
    return null;
  return args.join("");
};
export {
  $concat
};
