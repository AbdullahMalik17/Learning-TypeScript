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
var facet_exports = {};
__export(facet_exports, {
  $facet: () => $facet
});
module.exports = __toCommonJS(facet_exports);
var import_aggregator = require("../../aggregator");
var import_core = require("../../core");
const $facet = (collection, expr, options) => {
  return collection.transform((array) => {
    const o = {};
    for (const [k, pipeline] of Object.entries(expr)) {
      o[k] = new import_aggregator.Aggregator(pipeline, {
        ...options,
        processingMode: import_core.ProcessingMode.CLONE_INPUT
      }).run(array);
    }
    return [o];
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $facet
});
