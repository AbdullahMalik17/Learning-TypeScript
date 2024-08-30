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
var log10_exports = {};
__export(log10_exports, {
  $log10: () => $log10
});
module.exports = __toCommonJS(log10_exports);
var import_core = require("../../../core");
var import_util = require("../../../util");
const $log10 = (obj, expr, options) => {
  const n = (0, import_core.computeValue)(obj, expr, null, options);
  if ((0, import_util.isNil)(n))
    return null;
  (0, import_util.assert)(
    (0, import_util.isNumber)(n) || isNaN(n),
    "$log10 expression must resolve to a number."
  );
  return Math.log10(n);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $log10
});
