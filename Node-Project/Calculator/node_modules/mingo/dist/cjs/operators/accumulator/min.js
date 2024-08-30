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
var min_exports = {};
__export(min_exports, {
  $min: () => $min
});
module.exports = __toCommonJS(min_exports);
var import_util = require("../../util");
var import_push = require("./push");
const $min = (collection, expr, options) => {
  const nums = (0, import_push.$push)(collection, expr, options).filter(import_util.isNotNaN);
  const n = nums.reduce((acc, n2) => (0, import_util.compare)(n2, acc) <= 0 ? n2 : acc, Infinity);
  return n === Infinity ? void 0 : n;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $min
});
