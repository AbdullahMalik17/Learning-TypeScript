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
var rename_exports = {};
__export(rename_exports, {
  $rename: () => $rename
});
module.exports = __toCommonJS(rename_exports);
var import_util = require("../../util");
var import_internal = require("./_internal");
var import_set = require("./set");
const $rename = (obj, expr, arrayFilters = [], options = {}) => {
  const res = [];
  const changed = (0, import_internal.walkExpression)(expr, arrayFilters, options, (val, node, queries) => {
    return (0, import_internal.applyUpdate)(obj, node, queries, (o, k) => {
      if (!(0, import_util.has)(o, k))
        return false;
      res.push(...(0, import_set.$set)(obj, { [val]: o[k] }, arrayFilters, options));
      delete o[k];
      return true;
    });
  });
  return Array.from(new Set(changed.concat(res)));
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $rename
});
