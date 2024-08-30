var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var trignometry_exports = {};
module.exports = __toCommonJS(trignometry_exports);
__reExport(trignometry_exports, require("./acos"), module.exports);
__reExport(trignometry_exports, require("./acosh"), module.exports);
__reExport(trignometry_exports, require("./asin"), module.exports);
__reExport(trignometry_exports, require("./asinh"), module.exports);
__reExport(trignometry_exports, require("./atan"), module.exports);
__reExport(trignometry_exports, require("./atan2"), module.exports);
__reExport(trignometry_exports, require("./atanh"), module.exports);
__reExport(trignometry_exports, require("./cos"), module.exports);
__reExport(trignometry_exports, require("./cosh"), module.exports);
__reExport(trignometry_exports, require("./degreesToRadians"), module.exports);
__reExport(trignometry_exports, require("./radiansToDegrees"), module.exports);
__reExport(trignometry_exports, require("./sin"), module.exports);
__reExport(trignometry_exports, require("./sinh"), module.exports);
__reExport(trignometry_exports, require("./tan"), module.exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ...require("./acos"),
  ...require("./acosh"),
  ...require("./asin"),
  ...require("./asinh"),
  ...require("./atan"),
  ...require("./atan2"),
  ...require("./atanh"),
  ...require("./cos"),
  ...require("./cosh"),
  ...require("./degreesToRadians"),
  ...require("./radiansToDegrees"),
  ...require("./sin"),
  ...require("./sinh"),
  ...require("./tan")
});
