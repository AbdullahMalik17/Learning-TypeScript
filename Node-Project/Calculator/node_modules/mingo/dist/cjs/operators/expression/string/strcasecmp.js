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
var strcasecmp_exports = {};
__export(strcasecmp_exports, {
  $strcasecmp: () => $strcasecmp
});
module.exports = __toCommonJS(strcasecmp_exports);
var import_core = require("../../../core");
var import_util = require("../../../util");
const $strcasecmp = (obj, expr, options) => {
  const args = (0, import_core.computeValue)(obj, expr, null, options);
  let a = args[0];
  let b = args[1];
  if ((0, import_util.isEqual)(a, b) || args.every(import_util.isNil))
    return 0;
  (0, import_util.assert)(
    args.every(import_util.isString),
    "$strcasecmp must resolve to array(2) of strings"
  );
  a = a.toUpperCase();
  b = b.toUpperCase();
  return a > b && 1 || a < b && -1 || 0;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $strcasecmp
});
