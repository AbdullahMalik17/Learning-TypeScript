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
var atan2_exports = {};
__export(atan2_exports, {
  $atan2: () => $atan2
});
module.exports = __toCommonJS(atan2_exports);
var import_core = require("../../../core");
var import_util = require("../../../util");
const $atan2 = (obj, expr, options) => {
  const [y, x] = (0, import_core.computeValue)(obj, expr, null, options);
  if (isNaN(y) || (0, import_util.isNil)(y))
    return y;
  if (isNaN(x) || (0, import_util.isNil)(x))
    return x;
  return Math.atan2(y, x);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $atan2
});
