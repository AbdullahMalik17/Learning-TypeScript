import { applyUpdate, walkExpression } from "./_internal";
const $mul = (obj, expr, arrayFilters = [], options = {}) => {
  return walkExpression(expr, arrayFilters, options, (val, node, queries) => {
    return applyUpdate(
      obj,
      node,
      queries,
      (o, k) => {
        const prev = o[k];
        o[k] = o[k] === void 0 ? 0 : o[k] * val;
        return o[k] !== prev;
      },
      { buildGraph: true }
    );
  });
};
export {
  $mul
};
