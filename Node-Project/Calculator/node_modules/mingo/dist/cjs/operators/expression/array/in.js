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
var in_exports = {};
__export(in_exports, {
  $in: () => $in
});
module.exports = __toCommonJS(in_exports);
var import_core = require("../../../core");
var import_util = require("../../../util");
const $in = (obj, expr, options) => {
  const [item, arr] = (0, import_core.computeValue)(obj, expr, null, options);
  (0, import_util.assert)((0, import_util.isArray)(arr), "$in second argument must be an array");
  return arr.some(import_util.isEqual.bind(null, item));
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $in
});
