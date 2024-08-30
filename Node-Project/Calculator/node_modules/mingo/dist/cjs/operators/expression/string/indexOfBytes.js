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
var indexOfBytes_exports = {};
__export(indexOfBytes_exports, {
  $indexOfBytes: () => $indexOfBytes
});
module.exports = __toCommonJS(indexOfBytes_exports);
var import_core = require("../../../core");
var import_util = require("../../../util");
const $indexOfBytes = (obj, expr, options) => {
  const arr = (0, import_core.computeValue)(obj, expr, null, options);
  const errorMsg = "$indexOfBytes expression resolves to invalid an argument";
  if ((0, import_util.isNil)(arr[0]))
    return null;
  (0, import_util.assert)((0, import_util.isString)(arr[0]) && (0, import_util.isString)(arr[1]), errorMsg);
  const str = arr[0];
  const searchStr = arr[1];
  let start = arr[2];
  let end = arr[3];
  let valid = (0, import_util.isNil)(start) || (0, import_util.isNumber)(start) && start >= 0 && Math.round(start) === start;
  valid = valid && ((0, import_util.isNil)(end) || (0, import_util.isNumber)(end) && end >= 0 && Math.round(end) === end);
  (0, import_util.assert)(valid, errorMsg);
  start = start || 0;
  end = end || str.length;
  if (start > end)
    return -1;
  const index = str.substring(start, end).indexOf(searchStr);
  return index > -1 ? index + start : index;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $indexOfBytes
});
