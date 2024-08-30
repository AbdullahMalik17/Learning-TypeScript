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
var indexOfArray_exports = {};
__export(indexOfArray_exports, {
  $indexOfArray: () => $indexOfArray
});
module.exports = __toCommonJS(indexOfArray_exports);
var import_core = require("../../../core");
var import_util = require("../../../util");
const $indexOfArray = (obj, expr, options) => {
  const args = (0, import_core.computeValue)(obj, expr, null, options);
  if ((0, import_util.isNil)(args))
    return null;
  let arr = args[0];
  const searchValue = args[1];
  if ((0, import_util.isNil)(arr))
    return null;
  (0, import_util.assert)((0, import_util.isArray)(arr), "$indexOfArray expression must resolve to an array.");
  const start = args[2] || 0;
  let end = args[3];
  if ((0, import_util.isNil)(end))
    end = arr.length;
  if (start > end)
    return -1;
  (0, import_util.assert)(start >= 0 && end >= 0, "$indexOfArray expression is invalid");
  if (start > 0 || end < arr.length) {
    arr = arr.slice(start, end);
  }
  let index = -1;
  arr.some((v, i) => {
    const b = (0, import_util.isEqual)(v, searchValue);
    if (b)
      index = i;
    return b;
  });
  return index + start;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $indexOfArray
});
