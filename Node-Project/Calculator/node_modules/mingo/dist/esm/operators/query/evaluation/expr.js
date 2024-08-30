import { computeValue } from "../../../core";
function $expr(_, rhs, options) {
  return (obj) => computeValue(obj, rhs, null, options);
}
export {
  $expr
};
