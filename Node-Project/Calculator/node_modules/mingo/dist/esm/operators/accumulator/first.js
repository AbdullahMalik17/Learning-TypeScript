import { computeValue } from "../../core";
const $first = (collection, expr, options) => {
  return collection.length > 0 ? computeValue(collection[0], expr, null, options) : void 0;
};
export {
  $first
};
