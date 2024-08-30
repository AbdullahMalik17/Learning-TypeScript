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
var internal_exports = {};
__export(internal_exports, {
  bitwise: () => bitwise
});
module.exports = __toCommonJS(internal_exports);
var import_core = require("../../../core");
var import_util = require("../../../util");
const bitwise = (op, compute) => (obj, expr, options) => {
  (0, import_util.assert)((0, import_util.isArray)(expr), `${op}: expression must be an array.`);
  const nums = (0, import_core.computeValue)(obj, expr, null, options);
  if (nums.some(import_util.isNil))
    return null;
  (0, import_util.assert)(
    nums.every(import_util.isNumber),
    `${op}: expression must evalue to array of numbers.`
  );
  return compute(nums);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  bitwise
});
