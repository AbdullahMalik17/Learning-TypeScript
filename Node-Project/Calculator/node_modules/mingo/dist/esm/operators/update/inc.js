import { assert, isNumber, resolve } from "../../util";
import { applyUpdate, walkExpression } from "./_internal";
const $inc = (obj, expr, arrayFilters = [], options = {}) => {
  return walkExpression(expr, arrayFilters, options, (val, node, queries) => {
    if (!node.child) {
      const n = resolve(obj, node.parent);
      assert(
        n === void 0 || isNumber(n),
        `cannot apply $inc to a value of non-numeric type`
      );
    }
    return applyUpdate(
      obj,
      node,
      queries,
      (o, k) => {
        o[k] = (o[k] ||= 0) + val;
        return true;
      },
      { buildGraph: true }
    );
  });
};
export {
  $inc
};
