import { isEqual } from "../../util";
import { applyUpdate, clone, walkExpression } from "./_internal";
const $set = (obj, expr, arrayFilters = [], options = {}) => {
  return walkExpression(expr, arrayFilters, options, (val, node, queries) => {
    return applyUpdate(
      obj,
      node,
      queries,
      (o, k) => {
        if (isEqual(o[k], val))
          return false;
        o[k] = clone(options.cloneMode, val);
        return true;
      },
      { buildGraph: true }
    );
  });
};
export {
  $set
};
