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
var unionWith_exports = {};
__export(unionWith_exports, {
  $unionWith: () => $unionWith
});
module.exports = __toCommonJS(unionWith_exports);
var import_aggregator = require("../../aggregator");
var import_lazy = require("../../lazy");
var import_util = require("../../util");
const $unionWith = (collection, expr, options) => {
  const array = (0, import_util.isString)(expr.coll) ? options.collectionResolver(expr.coll) : expr.coll;
  const iterators = [collection];
  iterators.push(
    expr.pipeline ? new import_aggregator.Aggregator(expr.pipeline, options).stream(array) : (0, import_lazy.Lazy)(array)
  );
  return (0, import_lazy.compose)(...iterators);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $unionWith
});
