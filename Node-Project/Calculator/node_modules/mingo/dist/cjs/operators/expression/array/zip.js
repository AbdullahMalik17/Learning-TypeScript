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
var zip_exports = {};
__export(zip_exports, {
  $zip: () => $zip
});
module.exports = __toCommonJS(zip_exports);
var import_core = require("../../../core");
var import_util = require("../../../util");
const $zip = (obj, expr, options) => {
  const inputs = (0, import_core.computeValue)(
    obj,
    expr.inputs,
    null,
    options
  );
  const useLongestLength = expr.useLongestLength || false;
  (0, import_util.assert)((0, import_util.isArray)(inputs), "'inputs' expression must resolve to an array");
  (0, import_util.assert)((0, import_util.isBoolean)(useLongestLength), "'useLongestLength' must be a boolean");
  if ((0, import_util.isArray)(expr.defaults)) {
    (0, import_util.assert)(
      useLongestLength,
      "'useLongestLength' must be set to true to use 'defaults'"
    );
  }
  let zipCount = 0;
  for (let i = 0, len = inputs.length; i < len; i++) {
    const arr = inputs[i];
    if ((0, import_util.isNil)(arr))
      return null;
    (0, import_util.assert)(
      (0, import_util.isArray)(arr),
      "'inputs' expression values must resolve to an array or null"
    );
    zipCount = useLongestLength ? Math.max(zipCount, arr.length) : Math.min(zipCount || arr.length, arr.length);
  }
  const result = [];
  const defaults = expr.defaults || [];
  for (let i = 0; i < zipCount; i++) {
    const temp = inputs.map((val, index) => {
      return (0, import_util.isNil)(val[i]) ? defaults[index] || null : val[i];
    });
    result.push(temp);
  }
  return result;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $zip
});
