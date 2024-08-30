var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var import_core = require("../core");
var accumulatorOperators = __toESM(require("../operators/accumulator"));
var expressionOperators = __toESM(require("../operators/expression"));
var pipelineOperators = __toESM(require("../operators/pipeline"));
var projectionOperators = __toESM(require("../operators/projection"));
var queryOperators = __toESM(require("../operators/query"));
var windowOperators = __toESM(require("../operators/window"));
(0, import_core.useOperators)(import_core.OperatorType.ACCUMULATOR, accumulatorOperators);
(0, import_core.useOperators)(import_core.OperatorType.EXPRESSION, expressionOperators);
(0, import_core.useOperators)(import_core.OperatorType.PIPELINE, pipelineOperators);
(0, import_core.useOperators)(import_core.OperatorType.PROJECTION, projectionOperators);
(0, import_core.useOperators)(import_core.OperatorType.QUERY, queryOperators);
(0, import_core.useOperators)(import_core.OperatorType.WINDOW, windowOperators);
