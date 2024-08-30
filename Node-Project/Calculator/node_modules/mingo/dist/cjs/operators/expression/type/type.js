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
var type_exports = {};
__export(type_exports, {
  $type: () => $type
});
module.exports = __toCommonJS(type_exports);
var import_core = require("../../../core");
var import_util = require("../../../util");
const $type = (obj, expr, options) => {
  const val = (0, import_core.computeValue)(obj, expr, null, options);
  const typename = (0, import_util.getType)(val);
  const nativeType = typename.toLowerCase();
  switch (nativeType) {
    case "boolean":
      return "bool";
    case "number":
      if (val.toString().indexOf(".") >= 0)
        return "double";
      return val >= import_util.MIN_INT && val <= import_util.MAX_INT ? "int" : "long";
    case "regexp":
      return "regex";
    default:
      return nativeType;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $type
});
