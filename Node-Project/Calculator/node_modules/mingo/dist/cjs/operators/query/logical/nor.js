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
var nor_exports = {};
__export(nor_exports, {
  $nor: () => $nor
});
module.exports = __toCommonJS(nor_exports);
var import_util = require("../../../util");
var import_or = require("./or");
const $nor = (_, rhs, options) => {
  (0, import_util.assert)(
    (0, import_util.isArray)(rhs),
    "Invalid expression. $nor expects value to be an array."
  );
  const f = (0, import_or.$or)("$or", rhs, options);
  return (obj) => !f(obj);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $nor
});
