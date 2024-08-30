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
var updater_exports = {};
__export(updater_exports, {
  createUpdater: () => createUpdater,
  updateObject: () => updateObject
});
module.exports = __toCommonJS(updater_exports);
var import_core = require("./core");
var booleanOperators = __toESM(require("./operators/expression/boolean"));
var comparisonOperators = __toESM(require("./operators/expression/comparison"));
var queryOperators = __toESM(require("./operators/query"));
var UPDATE_OPERATORS = __toESM(require("./operators/update"));
var import_query = require("./query");
var import_util = require("./util");
function createUpdater(defaultOptions) {
  defaultOptions = {
    ...defaultOptions,
    queryOptions: (0, import_core.initOptions)(defaultOptions.queryOptions)
  };
  defaultOptions.queryOptions.context.addQueryOps(queryOperators).addExpressionOps(booleanOperators).addExpressionOps(comparisonOperators);
  return (obj, expr, arrayFilters = [], condition = {}, options = {}) => {
    const opts = Object.assign({ cloneMode: "copy" }, defaultOptions, options);
    Object.assign(opts, {
      queryOptions: (0, import_core.initOptions)(
        Object.assign({ useStrictMode: false }, opts?.queryOptions)
      )
    });
    arrayFilters = arrayFilters || [];
    condition = condition || {};
    const entry = Object.entries(expr);
    (0, import_util.assert)(
      entry.length === 1,
      "Update expression must contain only one operator."
    );
    const [op, args] = entry[0];
    (0, import_util.assert)(
      (0, import_util.has)(UPDATE_OPERATORS, op),
      `Update operator '${op}' is not supported.`
    );
    const mutate = UPDATE_OPERATORS[op];
    if (Object.keys(condition).length) {
      const q = condition instanceof import_query.Query ? condition : new import_query.Query(condition, opts.queryOptions);
      if (!q.test(obj))
        return [];
    }
    return mutate(obj, args, arrayFilters, opts);
  };
}
const updateObject = createUpdater({});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createUpdater,
  updateObject
});
