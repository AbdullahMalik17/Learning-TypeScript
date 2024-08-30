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
var bottomN_exports = {};
__export(bottomN_exports, {
  $bottomN: () => $bottomN
});
module.exports = __toCommonJS(bottomN_exports);
var import_aggregator = require("../../aggregator");
var import_core = require("../../core");
var import_push = require("./push");
const $bottomN = (collection, expr, options) => {
  const copts = import_core.ComputeOptions.init(options);
  const { n, sortBy } = (0, import_core.computeValue)(
    copts.local.groupId,
    expr,
    null,
    copts
  );
  const result = new import_aggregator.Aggregator([{ $sort: sortBy }], copts).run(collection);
  const m = result.length;
  const p = n;
  return (0, import_push.$push)(m <= p ? result : result.slice(m - p), expr.output, copts);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $bottomN
});
