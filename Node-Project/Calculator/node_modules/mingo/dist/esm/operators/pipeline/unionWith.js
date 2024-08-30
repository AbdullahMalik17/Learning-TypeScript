import { Aggregator } from "../../aggregator";
import { compose, Lazy } from "../../lazy";
import { isString } from "../../util";
const $unionWith = (collection, expr, options) => {
  const array = isString(expr.coll) ? options.collectionResolver(expr.coll) : expr.coll;
  const iterators = [collection];
  iterators.push(
    expr.pipeline ? new Aggregator(expr.pipeline, options).stream(array) : Lazy(array)
  );
  return compose(...iterators);
};
export {
  $unionWith
};
