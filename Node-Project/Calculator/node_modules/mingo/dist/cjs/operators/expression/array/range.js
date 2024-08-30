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
var range_exports = {};
__export(range_exports, {
  $range: () => $range
});
module.exports = __toCommonJS(range_exports);
var import_core = require("../../../core");
const $range = (obj, expr, options) => {
  const arr = (0, import_core.computeValue)(obj, expr, null, options);
  const start = arr[0];
  const end = arr[1];
  const step = arr[2] || 1;
  const result = new Array();
  let counter = start;
  while (counter < end && step > 0 || counter > end && step < 0) {
    result.push(counter);
    counter += step;
  }
  return result;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $range
});
