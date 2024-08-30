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
var toBool_exports = {};
__export(toBool_exports, {
  $toBool: () => $toBool
});
module.exports = __toCommonJS(toBool_exports);
var import_core = require("../../../core");
var import_util = require("../../../util");
const $toBool = (obj, expr, options) => {
  const val = (0, import_core.computeValue)(obj, expr, null, options);
  if ((0, import_util.isNil)(val))
    return null;
  if ((0, import_util.isString)(val))
    return true;
  return Boolean(val);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $toBool
});
