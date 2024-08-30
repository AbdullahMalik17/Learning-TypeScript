import {
  ComputeOptions,
  computeValue
} from "../../core";
import { isNil } from "../../util";
const $push = (collection, expr, options) => {
  if (isNil(expr))
    return collection;
  const copts = ComputeOptions.init(options);
  return collection.map(
    (obj) => computeValue(obj, expr, null, copts.update(obj))
  );
};
export {
  $push
};
