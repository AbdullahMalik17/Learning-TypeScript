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
var set_exports = {};
__export(set_exports, {
  $set: () => $set
});
module.exports = __toCommonJS(set_exports);
var import_util = require("../../util");
var import_internal = require("./_internal");
const $set = (obj, expr, arrayFilters = [], options = {}) => {
  return (0, import_internal.walkExpression)(expr, arrayFilters, options, (val, node, queries) => {
    return (0, import_internal.applyUpdate)(
      obj,
      node,
      queries,
      (o, k) => {
        if ((0, import_util.isEqual)(o[k], val))
          return false;
        o[k] = (0, import_internal.clone)(options.cloneMode, val);
        return true;
      },
      { buildGraph: true }
    );
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $set
});
