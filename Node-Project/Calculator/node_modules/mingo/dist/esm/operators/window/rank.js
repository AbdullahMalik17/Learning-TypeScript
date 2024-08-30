import { rank } from "./_internal";
function $rank(obj, collection, expr, options) {
  return rank(
    obj,
    collection,
    expr,
    options,
    false
    /*dense*/
  );
}
export {
  $rank
};
