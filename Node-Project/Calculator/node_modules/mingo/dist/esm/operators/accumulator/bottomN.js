import { Aggregator } from "../../aggregator";
import {
  ComputeOptions,
  computeValue
} from "../../core";
import { $push } from "./push";
const $bottomN = (collection, expr, options) => {
  const copts = ComputeOptions.init(options);
  const { n, sortBy } = computeValue(
    copts.local.groupId,
    expr,
    null,
    copts
  );
  const result = new Aggregator([{ $sort: sortBy }], copts).run(collection);
  const m = result.length;
  const p = n;
  return $push(m <= p ? result : result.slice(m - p), expr.output, copts);
};
export {
  $bottomN
};
