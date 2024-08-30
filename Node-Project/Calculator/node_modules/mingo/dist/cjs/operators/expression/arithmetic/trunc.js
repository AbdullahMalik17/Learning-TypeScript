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
var trunc_exports = {};
__export(trunc_exports, {
  $trunc: () => $trunc
});
module.exports = __toCommonJS(trunc_exports);
var import_core = require("../../../core");
var import_util = require("../../../util");
var import_internal = require("./_internal");
const $trunc = (obj, expr, options) => {
  const arr = (0, import_core.computeValue)(obj, expr, null, options);
  const num = arr[0];
  const places = arr[1];
  if ((0, import_util.isNil)(num) || isNaN(num) || Math.abs(num) === Infinity)
    return num;
  (0, import_util.assert)((0, import_util.isNumber)(num), "$trunc expression must resolve to a number.");
  (0, import_util.assert)(
    (0, import_util.isNil)(places) || (0, import_util.isNumber)(places) && places > -20 && places < 100,
    "$trunc expression has invalid place"
  );
  return (0, import_internal.truncate)(num, places, false);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $trunc
});
