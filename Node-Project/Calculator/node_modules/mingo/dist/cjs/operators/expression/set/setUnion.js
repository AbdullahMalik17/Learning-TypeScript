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
var setUnion_exports = {};
__export(setUnion_exports, {
  $setUnion: () => $setUnion
});
module.exports = __toCommonJS(setUnion_exports);
var import_core = require("../../../core");
var import_util = require("../../../util");
const $setUnion = (obj, expr, options) => {
  const args = (0, import_core.computeValue)(obj, expr, null, options);
  (0, import_util.assert)(
    (0, import_util.isArray)(args) && args.length == 2 && args.every(import_util.isArray),
    "$setUnion: arguments must be arrays"
  );
  return (0, import_util.unique)(args[0].concat(args[1]), options?.hashFunction);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $setUnion
});
