import { $pull } from "./pull";
const $pullAll = (obj, expr, arrayFilters = [], options = {}) => {
  const pullExpr = {};
  Object.entries(expr).forEach(([k, v]) => {
    pullExpr[k] = { $in: v };
  });
  return $pull(obj, pullExpr, arrayFilters, options);
};
export {
  $pullAll
};
