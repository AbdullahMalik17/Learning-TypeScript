var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var basic_exports = {};
__export(basic_exports, {
  BASIC_CONTEXT: () => BASIC_CONTEXT
});
module.exports = __toCommonJS(basic_exports);
var import_core = require("../core");
var booleanOperators = __toESM(require("../operators/expression/boolean"));
var comparisonOperators = __toESM(require("../operators/expression/comparison"));
var import_pipeline = require("../operators/pipeline");
var projectionOperators = __toESM(require("../operators/projection"));
var queryOperators = __toESM(require("../operators/query"));
(0, import_core.useOperators)(import_core.OperatorType.EXPRESSION, {
  ...booleanOperators,
  ...comparisonOperators
});
(0, import_core.useOperators)(import_core.OperatorType.PIPELINE, {
  $project: import_pipeline.$project,
  $skip: import_pipeline.$skip,
  $limit: import_pipeline.$limit,
  $sort: import_pipeline.$sort
});
(0, import_core.useOperators)(import_core.OperatorType.PROJECTION, projectionOperators);
(0, import_core.useOperators)(import_core.OperatorType.QUERY, queryOperators);
const BASIC_CONTEXT = import_core.Context.init().addExpressionOps({
  ...booleanOperators,
  ...comparisonOperators
}).addPipelineOps({ $project: import_pipeline.$project, $skip: import_pipeline.$skip, $limit: import_pipeline.$limit, $sort: import_pipeline.$sort }).addProjectionOps(projectionOperators).addQueryOps(queryOperators);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BASIC_CONTEXT
});
