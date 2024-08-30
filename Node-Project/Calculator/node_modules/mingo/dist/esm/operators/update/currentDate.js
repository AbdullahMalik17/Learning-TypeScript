import { applyUpdate, walkExpression } from "./_internal";
const $currentDate = (obj, expr, arrayFilters = [], options = {}) => {
  const now = Date.now();
  return walkExpression(expr, arrayFilters, options, (_, node, queries) => {
    return applyUpdate(
      obj,
      node,
      queries,
      (o, k) => {
        o[k] = now;
        return true;
      },
      { buildGraph: true }
    );
  });
};
export {
  $currentDate
};
