import { Aggregator } from "../../aggregator";
import {
  ComputeOptions,
  computeValue
} from "../../core";
import { $push } from "./push";
const $topN = (collection, expr, options) => {
  const copts = ComputeOptions.init(options);
  const { n, sortBy } = computeValue(
    copts.local.groupId,
    expr,
    null,
    copts
  );
  const result = new Aggregator([{ $sort: sortBy }, { $limit: n }], copts).run(
    collection
  );
  return $push(result, expr.output, copts);
};
export {
  $topN
};
