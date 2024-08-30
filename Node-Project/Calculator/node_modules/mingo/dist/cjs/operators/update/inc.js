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
var inc_exports = {};
__export(inc_exports, {
  $inc: () => $inc
});
module.exports = __toCommonJS(inc_exports);
var import_util = require("../../util");
var import_internal = require("./_internal");
const $inc = (obj, expr, arrayFilters = [], options = {}) => {
  return (0, import_internal.walkExpression)(expr, arrayFilters, options, (val, node, queries) => {
    if (!node.child) {
      const n = (0, import_util.resolve)(obj, node.parent);
      (0, import_util.assert)(
        n === void 0 || (0, import_util.isNumber)(n),
        `cannot apply $inc to a value of non-numeric type`
      );
    }
    return (0, import_internal.applyUpdate)(
      obj,
      node,
      queries,
      (o, k) => {
        o[k] = (o[k] ||= 0) + val;
        return true;
      },
      { buildGraph: true }
    );
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $inc
});
