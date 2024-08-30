import { Query } from "../../../query";
import { assert, isArray } from "../../../util";
const $or = (_, rhs, options) => {
  assert(isArray(rhs), "Invalid expression. $or expects value to be an Array");
  const queries = rhs.map((expr) => new Query(expr, options));
  return (obj) => queries.some((q) => q.test(obj));
};
export {
  $or
};
