import { initOptions } from "./core";
import * as booleanOperators from "./operators/expression/boolean";
import * as comparisonOperators from "./operators/expression/comparison";
import * as queryOperators from "./operators/query";
import * as UPDATE_OPERATORS from "./operators/update";
import { Query } from "./query";
import { assert, has } from "./util";
function createUpdater(defaultOptions) {
  defaultOptions = {
    ...defaultOptions,
    queryOptions: initOptions(defaultOptions.queryOptions)
  };
  defaultOptions.queryOptions.context.addQueryOps(queryOperators).addExpressionOps(booleanOperators).addExpressionOps(comparisonOperators);
  return (obj, expr, arrayFilters = [], condition = {}, options = {}) => {
    const opts = Object.assign({ cloneMode: "copy" }, defaultOptions, options);
    Object.assign(opts, {
      queryOptions: initOptions(
        Object.assign({ useStrictMode: false }, opts?.queryOptions)
      )
    });
    arrayFilters = arrayFilters || [];
    condition = condition || {};
    const entry = Object.entries(expr);
    assert(
      entry.length === 1,
      "Update expression must contain only one operator."
    );
    const [op, args] = entry[0];
    assert(
      has(UPDATE_OPERATORS, op),
      `Update operator '${op}' is not supported.`
    );
    const mutate = UPDATE_OPERATORS[op];
    if (Object.keys(condition).length) {
      const q = condition instanceof Query ? condition : new Query(condition, opts.queryOptions);
      if (!q.test(obj))
        return [];
    }
    return mutate(obj, args, arrayFilters, opts);
  };
}
const updateObject = createUpdater({});
export {
  createUpdater,
  updateObject
};
