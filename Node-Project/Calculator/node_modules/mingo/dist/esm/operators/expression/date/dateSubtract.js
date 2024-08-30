import { computeValue } from "../../../core";
import { $dateAdd } from "./dateAdd";
const $dateSubtract = (obj, expr, options) => {
  const amount = computeValue(obj, expr?.amount, null, options);
  return $dateAdd(obj, { ...expr, amount: -1 * amount }, options);
};
export {
  $dateSubtract
};
