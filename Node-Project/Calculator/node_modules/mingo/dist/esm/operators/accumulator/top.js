import { $topN } from "./topN";
const $top = (collection, expr, options) => $topN(collection, { ...expr, n: 1 }, options);
export {
  $top
};
