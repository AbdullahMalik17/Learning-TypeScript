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
var pullAll_exports = {};
__export(pullAll_exports, {
  $pullAll: () => $pullAll
});
module.exports = __toCommonJS(pullAll_exports);
var import_pull = require("./pull");
const $pullAll = (obj, expr, arrayFilters = [], options = {}) => {
  const pullExpr = {};
  Object.entries(expr).forEach(([k, v]) => {
    pullExpr[k] = { $in: v };
  });
  return (0, import_pull.$pull)(obj, pullExpr, arrayFilters, options);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $pullAll
});
