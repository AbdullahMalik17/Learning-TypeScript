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
var query_exports = {};
__export(query_exports, {
  Query: () => Query
});
module.exports = __toCommonJS(query_exports);
var import_core = require("./core");
var import_cursor = require("./cursor");
var import_util = require("./util");
class Query {
  constructor(condition, options) {
    this.condition = condition;
    this.options = (0, import_core.initOptions)(options);
    this.compiled = [];
    this.compile();
  }
  compile() {
    (0, import_util.assert)(
      (0, import_util.isObject)(this.condition),
      `query criteria must be an object: ${JSON.stringify(this.condition)}`
    );
    const whereOperator = {};
    for (const [field, expr] of Object.entries(this.condition)) {
      if ("$where" === field) {
        Object.assign(whereOperator, { field, expr });
      } else if ((0, import_util.inArray)(["$and", "$or", "$nor", "$expr", "$jsonSchema"], field)) {
        this.processOperator(field, field, expr);
      } else {
        (0, import_util.assert)(!(0, import_util.isOperator)(field), `unknown top level operator: ${field}`);
        for (const [operator, val] of Object.entries(
          (0, import_util.normalize)(expr)
        )) {
          this.processOperator(field, operator, val);
        }
      }
      if (whereOperator.field) {
        this.processOperator(
          whereOperator.field,
          whereOperator.field,
          whereOperator.expr
        );
      }
    }
  }
  processOperator(field, operator, value) {
    const call = (0, import_core.getOperator)(
      import_core.OperatorType.QUERY,
      operator,
      this.options
    );
    if (!call) {
      throw new import_util.MingoError(`unknown query operator ${operator}`);
    }
    const fn = call(field, value, this.options);
    this.compiled.push(fn);
  }
  /**
   * Checks if the object passes the query criteria. Returns true if so, false otherwise.
   *
   * @param obj The object to test
   * @returns {boolean} True or false
   */
  test(obj) {
    for (let i = 0, len = this.compiled.length; i < len; i++) {
      if (!this.compiled[i](obj)) {
        return false;
      }
    }
    return true;
  }
  /**
   * Returns a cursor to select matching documents from the input source.
   *
   * @param source A source providing a sequence of documents
   * @param projection An optional projection criteria
   * @returns {Cursor} A Cursor for iterating over the results
   */
  find(collection, projection) {
    return new import_cursor.Cursor(
      collection,
      (x) => this.test(x),
      projection || {},
      this.options
    );
  }
  /**
   * Remove matched documents from the collection returning the remainder
   *
   * @param collection An array of documents
   * @returns {Array} A new array with matching elements removed
   */
  remove(collection) {
    return collection.reduce((acc, obj) => {
      if (!this.test(obj))
        acc.push(obj);
      return acc;
    }, []);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Query
});
