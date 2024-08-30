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
var src_exports = {};
__export(src_exports, {
  Aggregator: () => import_aggregator2.Aggregator,
  Query: () => import_query2.Query,
  aggregate: () => aggregate,
  default: () => src_default,
  find: () => find,
  remove: () => remove
});
module.exports = __toCommonJS(src_exports);
var import_basic = require("./init/basic");
var import_aggregator = require("./aggregator");
var import_query = require("./query");
var import_aggregator2 = require("./aggregator");
var import_query2 = require("./query");
function find(collection, criteria, projection, options) {
  return new import_query.Query(criteria, options).find(collection, projection);
}
function remove(collection, criteria, options) {
  return new import_query.Query(criteria, options).remove(collection);
}
function aggregate(collection, pipeline, options) {
  return new import_aggregator.Aggregator(pipeline, options).run(collection);
}
var src_default = {
  Aggregator: import_aggregator.Aggregator,
  Query: import_query.Query,
  aggregate,
  find,
  remove
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Aggregator,
  Query,
  aggregate,
  find,
  remove
});
