import { ensureArray } from "../../util";
import { $project } from "./project";
const $unset = (collection, expr, options) => {
  expr = ensureArray(expr);
  const doc = {};
  for (const k of expr)
    doc[k] = 0;
  return $project(collection, doc, options);
};
export {
  $unset
};
