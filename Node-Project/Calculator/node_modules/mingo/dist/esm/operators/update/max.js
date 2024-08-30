import { compare } from "../../util";
import { applyUpdate, walkExpression } from "./_internal";
const $max = (obj, expr, arrayFilters = [], options = {}) => {
  return walkExpression(expr, arrayFilters, options, (val, node, queries) => {
    return applyUpdate(
      obj,
      node,
      queries,
      (o, k) => {
        if (o[k] !== void 0 && compare(o[k], val) > -1)
          return false;
        o[k] = val;
        return true;
      },
      { buildGraph: true }
    );
  });
};
export {
  $max
};
