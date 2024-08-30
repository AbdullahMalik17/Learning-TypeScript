import { $group } from "./group";
import { $sort } from "./sort";
const $sortByCount = (collection, expr, options) => {
  const newExpr = { count: { $sum: 1 } };
  newExpr["_id"] = expr;
  return $sort($group(collection, newExpr, options), { count: -1 }, options);
};
export {
  $sortByCount
};
