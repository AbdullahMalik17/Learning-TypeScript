import { $percentile } from "./percentile";
const $median = (collection, expr, options) => $percentile(collection, { ...expr, p: [0.5] }, options).pop();
export {
  $median
};
