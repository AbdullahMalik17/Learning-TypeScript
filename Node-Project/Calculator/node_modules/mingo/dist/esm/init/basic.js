import { Context, OperatorType, useOperators } from "../core";
import * as booleanOperators from "../operators/expression/boolean";
import * as comparisonOperators from "../operators/expression/comparison";
import { $limit, $project, $skip, $sort } from "../operators/pipeline";
import * as projectionOperators from "../operators/projection";
import * as queryOperators from "../operators/query";
useOperators(OperatorType.EXPRESSION, {
  ...booleanOperators,
  ...comparisonOperators
});
useOperators(OperatorType.PIPELINE, {
  $project,
  $skip,
  $limit,
  $sort
});
useOperators(OperatorType.PROJECTION, projectionOperators);
useOperators(OperatorType.QUERY, queryOperators);
const BASIC_CONTEXT = Context.init().addExpressionOps({
  ...booleanOperators,
  ...comparisonOperators
}).addPipelineOps({ $project, $skip, $limit, $sort }).addProjectionOps(projectionOperators).addQueryOps(queryOperators);
export {
  BASIC_CONTEXT
};
