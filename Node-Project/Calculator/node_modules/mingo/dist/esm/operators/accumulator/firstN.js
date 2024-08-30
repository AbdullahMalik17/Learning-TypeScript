import {
  ComputeOptions,
  computeValue
} from "../../core";
import { $push } from "./push";
const $firstN = (collection, expr, options) => {
  const copts = ComputeOptions.init(options);
  const m = collection.length;
  const n = computeValue(copts?.local?.groupId, expr.n, null, copts);
  return $push(
    m <= n ? collection : collection.slice(0, n),
    expr.input,
    options
  );
};
export {
  $firstN
};
