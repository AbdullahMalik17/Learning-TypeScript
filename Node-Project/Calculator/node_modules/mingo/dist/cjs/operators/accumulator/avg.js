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
var avg_exports = {};
__export(avg_exports, {
  $avg: () => $avg
});
module.exports = __toCommonJS(avg_exports);
var import_util = require("../../util");
var import_push = require("./push");
const $avg = (collection, expr, options) => {
  const data = (0, import_push.$push)(collection, expr, options).filter(import_util.isNumber);
  const sum = data.reduce((acc, n) => acc + n, 0);
  return sum / (data.length || 1);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $avg
});
