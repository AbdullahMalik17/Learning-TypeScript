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
var substr_exports = {};
__export(substr_exports, {
  $substr: () => $substr
});
module.exports = __toCommonJS(substr_exports);
var import_core = require("../../../core");
var import_util = require("../../../util");
const $substr = (obj, expr, options) => {
  const args = (0, import_core.computeValue)(obj, expr, null, options);
  const s = args[0];
  const index = args[1];
  const count = args[2];
  if ((0, import_util.isString)(s)) {
    if (index < 0) {
      return "";
    } else if (count < 0) {
      return s.substr(index);
    } else {
      return s.substr(index, count);
    }
  }
  return "";
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $substr
});
