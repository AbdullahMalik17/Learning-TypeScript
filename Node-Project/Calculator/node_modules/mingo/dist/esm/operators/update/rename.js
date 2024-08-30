import { has } from "../../util";
import { applyUpdate, walkExpression } from "./_internal";
import { $set } from "./set";
const $rename = (obj, expr, arrayFilters = [], options = {}) => {
  const res = [];
  const changed = walkExpression(expr, arrayFilters, options, (val, node, queries) => {
    return applyUpdate(obj, node, queries, (o, k) => {
      if (!has(o, k))
        return false;
      res.push(...$set(obj, { [val]: o[k] }, arrayFilters, options));
      delete o[k];
      return true;
    });
  });
  return Array.from(new Set(changed.concat(res)));
};
export {
  $rename
};
