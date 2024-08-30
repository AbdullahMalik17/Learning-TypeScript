import { assert, isArray } from "../../../util";
import { $or } from "./or";
const $nor = (_, rhs, options) => {
  assert(
    isArray(rhs),
    "Invalid expression. $nor expects value to be an array."
  );
  const f = $or("$or", rhs, options);
  return (obj) => !f(obj);
};
export {
  $nor
};
