import {
  ComputeOptions,
  computeValue
} from "../../core";
import { assert } from "../../util";
const $accumulator = (collection, expr, options) => {
  assert(
    !!options && options.scriptEnabled,
    "$accumulator operator requires 'scriptEnabled' option to be true"
  );
  if (collection.length == 0)
    return expr.initArgs;
  const copts = ComputeOptions.init(options);
  const initArgs = computeValue(
    {},
    expr.initArgs || [],
    null,
    copts.update(copts?.local?.groupId || {})
  );
  let state = expr.init.call(null, ...initArgs);
  for (const doc of collection) {
    const args = computeValue(
      doc,
      expr.accumulateArgs,
      null,
      copts.update(doc)
    );
    state = expr.accumulate.call(null, ...[state, ...args]);
  }
  return expr.finalize ? expr.finalize.call(null, state) : state;
};
export {
  $accumulator
};
