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
var regexFind_exports = {};
__export(regexFind_exports, {
  $regexFind: () => $regexFind
});
module.exports = __toCommonJS(regexFind_exports);
var import_internal = require("./_internal");
const $regexFind = (obj, expr, options) => {
  const result = (0, import_internal.regexSearch)(obj, expr, options, { global: false });
  return result && result.length > 0 ? result[0] : null;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $regexFind
});
