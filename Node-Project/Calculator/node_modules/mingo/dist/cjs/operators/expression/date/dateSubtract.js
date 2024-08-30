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
var dateSubtract_exports = {};
__export(dateSubtract_exports, {
  $dateSubtract: () => $dateSubtract
});
module.exports = __toCommonJS(dateSubtract_exports);
var import_core = require("../../../core");
var import_dateAdd = require("./dateAdd");
const $dateSubtract = (obj, expr, options) => {
  const amount = (0, import_core.computeValue)(obj, expr?.amount, null, options);
  return (0, import_dateAdd.$dateAdd)(obj, { ...expr, amount: -1 * amount }, options);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $dateSubtract
});
