var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var aggregator_exports = {};
__export(aggregator_exports, {
  Aggregator: () => Aggregator
});
module.exports = __toCommonJS(aggregator_exports);
var import_core = require("./core");
var import_lazy = require("./lazy");
var import_util = require("./util");
class Aggregator {
  constructor(pipeline, options) {
    this.pipeline = pipeline;
    this.options = (0, import_core.initOptions)(options);
  }
  /**
   * Returns an `Lazy` iterator for processing results of pipeline
   *
   * @param {*} collection An array or iterator object
   * @returns {Iterator} an iterator object
   */
  stream(collection) {
    let iterator = (0, import_lazy.Lazy)(collection);
    const mode = this.options.processingMode;
    if (mode == import_core.ProcessingMode.CLONE_ALL || mode == import_core.ProcessingMode.CLONE_INPUT) {
      iterator.map(import_util.cloneDeep);
    }
    const pipelineOperators = new Array();
    if (!(0, import_util.isEmpty)(this.pipeline)) {
      for (const operator of this.pipeline) {
        const operatorKeys = Object.keys(operator);
        const opName = operatorKeys[0];
        const call = (0, import_core.getOperator)(
          import_core.OperatorType.PIPELINE,
          opName,
          this.options
        );
        (0, import_util.assert)(
          operatorKeys.length === 1 && !!call,
          `invalid pipeline operator ${opName}`
        );
        pipelineOperators.push(opName);
        iterator = call(iterator, operator[opName], this.options);
      }
    }
    if (mode == import_core.ProcessingMode.CLONE_OUTPUT || mode == import_core.ProcessingMode.CLONE_ALL && !!(0, import_util.intersection)([["$group", "$unwind"], pipelineOperators]).length) {
      iterator.map(import_util.cloneDeep);
    }
    return iterator;
  }
  /**
   * Return the results of the aggregation as an array.
   *
   * @param {*} collection
   * @param {*} query
   */
  run(collection) {
    return this.stream(collection).value();
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Aggregator
});
