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
var rtrim_exports = {};
__export(rtrim_exports, {
  $rtrim: () => $rtrim
});
module.exports = __toCommonJS(rtrim_exports);
var import_internal = require("./_internal");
const $rtrim = (obj, expr, options) => {
  return (0, import_internal.trimString)(obj, expr, options, { left: false, right: true });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $rtrim
});
