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
var unset_exports = {};
__export(unset_exports, {
  $unset: () => $unset
});
module.exports = __toCommonJS(unset_exports);
var import_util = require("../../util");
var import_project = require("./project");
const $unset = (collection, expr, options) => {
  expr = (0, import_util.ensureArray)(expr);
  const doc = {};
  for (const k of expr)
    doc[k] = 0;
  return (0, import_project.$project)(collection, doc, options);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $unset
});
