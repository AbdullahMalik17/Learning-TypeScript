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
var slice_exports = {};
__export(slice_exports, {
  $slice: () => $slice
});
module.exports = __toCommonJS(slice_exports);
var import_core = require("../../../core");
var import_util = require("../../../util");
const $slice = (obj, expr, options) => {
  const args = (0, import_core.computeValue)(obj, expr, null, options);
  const arr = args[0];
  let skip = args[1];
  let limit = args[2];
  if ((0, import_util.isNil)(limit)) {
    if (skip < 0) {
      skip = Math.max(0, arr.length + skip);
      limit = arr.length - skip + 1;
    } else {
      limit = skip;
      skip = 0;
    }
  } else {
    if (skip < 0) {
      skip = Math.max(0, arr.length + skip);
    }
    (0, import_util.assert)(
      limit > 0,
      `Invalid argument for $slice operator. Limit must be a positive number`
    );
    limit += skip;
  }
  return arr.slice(skip, limit);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $slice
});
