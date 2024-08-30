import { Aggregator } from "../../aggregator";
import { ProcessingMode } from "../../core";
const $facet = (collection, expr, options) => {
  return collection.transform((array) => {
    const o = {};
    for (const [k, pipeline] of Object.entries(expr)) {
      o[k] = new Aggregator(pipeline, {
        ...options,
        processingMode: ProcessingMode.CLONE_INPUT
      }).run(array);
    }
    return [o];
  });
};
export {
  $facet
};
