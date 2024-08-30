import {
  ComputeOptions,
  computeValue
} from "../../core";
import { compare, isNil } from "../../util";
import { $push } from "./push";
const $minN = (collection, expr, options) => {
  const copts = ComputeOptions.init(options);
  const m = collection.length;
  const n = computeValue(copts?.local?.groupId, expr.n, null, copts);
  const arr = $push(collection, expr.input, options).filter((o) => !isNil(o));
  arr.sort(compare);
  return m <= n ? arr : arr.slice(0, n);
};
export {
  $minN
};
