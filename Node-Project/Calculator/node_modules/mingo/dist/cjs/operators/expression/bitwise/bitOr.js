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
var bitOr_exports = {};
__export(bitOr_exports, {
  $bitOr: () => $bitOr
});
module.exports = __toCommonJS(bitOr_exports);
var import_internal = require("./_internal");
const $bitOr = (0, import_internal.bitwise)(
  "$bitOr",
  (nums) => nums.reduce((a, b) => a | b, 0)
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $bitOr
});
