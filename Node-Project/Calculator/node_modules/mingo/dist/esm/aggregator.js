import {
  getOperator,
  initOptions,
  OperatorType,
  ProcessingMode
} from "./core";
import { Lazy } from "./lazy";
import { assert, cloneDeep, intersection, isEmpty } from "./util";
class Aggregator {
  constructor(pipeline, options) {
    this.pipeline = pipeline;
    this.options = initOptions(options);
  }
  /**
   * Returns an `Lazy` iterator for processing results of pipeline
   *
   * @param {*} collection An array or iterator object
   * @returns {Iterator} an iterator object
   */
  stream(collection) {
    let iterator = Lazy(collection);
    const mode = this.options.processingMode;
    if (mode == ProcessingMode.CLONE_ALL || mode == ProcessingMode.CLONE_INPUT) {
      iterator.map(cloneDeep);
    }
    const pipelineOperators = new Array();
    if (!isEmpty(this.pipeline)) {
      for (const operator of this.pipeline) {
        const operatorKeys = Object.keys(operator);
        const opName = operatorKeys[0];
        const call = getOperator(
          OperatorType.PIPELINE,
          opName,
          this.options
        );
        assert(
          operatorKeys.length === 1 && !!call,
          `invalid pipeline operator ${opName}`
        );
        pipelineOperators.push(opName);
        iterator = call(iterator, operator[opName], this.options);
      }
    }
    if (mode == ProcessingMode.CLONE_OUTPUT || mode == ProcessingMode.CLONE_ALL && !!intersection([["$group", "$unwind"], pipelineOperators]).length) {
      iterator.map(cloneDeep);
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
export {
  Aggregator
};
