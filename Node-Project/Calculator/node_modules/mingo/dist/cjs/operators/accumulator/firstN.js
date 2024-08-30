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
var firstN_exports = {};
__export(firstN_exports, {
  $firstN: () => $firstN
});
module.exports = __toCommonJS(firstN_exports);
var import_core = require("../../core");
var import_push = require("./push");
const $firstN = (collection, expr, options) => {
  const copts = import_core.ComputeOptions.init(options);
  const m = collection.length;
  const n = (0, import_core.computeValue)(copts?.local?.groupId, expr.n, null, copts);
  return (0, import_push.$push)(
    m <= n ? collection : collection.slice(0, n),
    expr.input,
    options
  );
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $firstN
});
