import { Query } from "../../query";
const $match = (collection, expr, options) => {
  const q = new Query(expr, options);
  return collection.filter((o) => q.test(o));
};
export {
  $match
};
