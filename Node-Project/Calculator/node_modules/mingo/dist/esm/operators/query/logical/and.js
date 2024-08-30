import { Query } from "../../../query";
import { assert, isArray } from "../../../util";
const $and = (_, rhs, options) => {
  assert(
    isArray(rhs),
    "Invalid expression: $and expects value to be an Array."
  );
  const queries = rhs.map((expr) => new Query(expr, options));
  return (obj) => queries.every((q) => q.test(obj));
};
export {
  $and
};
