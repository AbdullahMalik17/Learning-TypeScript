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
var pop_exports = {};
__export(pop_exports, {
  $pop: () => $pop
});
module.exports = __toCommonJS(pop_exports);
var import_util = require("../../util");
var import_internal = require("./_internal");
const $pop = (obj, expr, arrayFilters = [], options = {}) => {
  return (0, import_internal.walkExpression)(expr, arrayFilters, options, (val, node, queries) => {
    return (0, import_internal.applyUpdate)(obj, node, queries, (o, k) => {
      const arr = o[k];
      (0, import_util.assert)(
        (0, import_util.isArray)(arr),
        `path '${node.selector}' contains an element of non-array type.`
      );
      if (!arr.length)
        return false;
      if (val === -1) {
        arr.splice(0, 1);
      } else {
        arr.pop();
      }
      return true;
    });
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $pop
});
