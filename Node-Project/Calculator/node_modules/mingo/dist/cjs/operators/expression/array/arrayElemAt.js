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
var arrayElemAt_exports = {};
__export(arrayElemAt_exports, {
  $arrayElemAt: () => $arrayElemAt
});
module.exports = __toCommonJS(arrayElemAt_exports);
var import_core = require("../../../core");
var import_util = require("../../../util");
const $arrayElemAt = (obj, expr, options) => {
  const args = (0, import_core.computeValue)(obj, expr, null, options);
  (0, import_util.assert)(
    args instanceof Array && args.length === 2,
    "$arrayElemAt expression must resolve to array(2)"
  );
  if (args.some(import_util.isNil))
    return null;
  const index = args[1];
  const arr = args[0];
  if (index < 0 && Math.abs(index) <= arr.length) {
    return arr[(index + arr.length) % arr.length];
  } else if (index >= 0 && index < arr.length) {
    return arr[index];
  }
  return void 0;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $arrayElemAt
});
