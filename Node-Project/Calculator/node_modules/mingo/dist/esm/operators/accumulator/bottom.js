import { $bottomN } from "./bottomN";
const $bottom = (collection, expr, options) => $bottomN(collection, { ...expr, n: 1 }, options);
export {
  $bottom
};
