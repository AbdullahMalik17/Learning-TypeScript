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
var add_exports = {};
__export(add_exports, {
  $add: () => $add
});
module.exports = __toCommonJS(add_exports);
var import_core = require("../../../core");
var import_util = require("../../../util");
const $add = (obj, expr, options) => {
  const args = (0, import_core.computeValue)(obj, expr, null, options);
  let foundDate = false;
  const result = args.reduce((acc, val) => {
    if ((0, import_util.isDate)(val)) {
      (0, import_util.assert)(!foundDate, "'$add' can only have one date value");
      foundDate = true;
      val = val.getTime();
    }
    acc += val;
    return acc;
  }, 0);
  return foundDate ? new Date(result) : result;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $add
});
