import { assert, cloneDeep, isString } from "../../util";
const $out = (collection, expr, options) => {
  const outputColl = isString(expr) ? options?.collectionResolver(expr) : expr;
  assert(outputColl instanceof Array, `expression must resolve to an array`);
  return collection.map((o) => {
    outputColl.push(cloneDeep(o));
    return o;
  });
};
export {
  $out
};
