import { rank } from "./_internal";
function $denseRank(obj, collection, expr, options) {
  return rank(
    obj,
    collection,
    expr,
    options,
    true
    /*dense*/
  );
}
export {
  $denseRank
};
