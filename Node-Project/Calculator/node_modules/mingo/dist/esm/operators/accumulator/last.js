import { computeValue } from "../../core";
const $last = (collection, expr, options) => {
  return collection.length > 0 ? computeValue(collection[collection.length - 1], expr, null, options) : void 0;
};
export {
  $last
};
