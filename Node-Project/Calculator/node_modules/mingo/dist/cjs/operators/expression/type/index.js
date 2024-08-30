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
var type_exports = {};
module.exports = __toCommonJS(type_exports);
__reExport(type_exports, require("./convert"), module.exports);
__reExport(type_exports, require("./isNumber"), module.exports);
__reExport(type_exports, require("./toBool"), module.exports);
__reExport(type_exports, require("./toDate"), module.exports);
__reExport(type_exports, require("./toDecimal"), module.exports);
__reExport(type_exports, require("./toDouble"), module.exports);
__reExport(type_exports, require("./toInt"), module.exports);
__reExport(type_exports, require("./toLong"), module.exports);
__reExport(type_exports, require("./toString"), module.exports);
__reExport(type_exports, require("./type"), module.exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ...require("./convert"),
  ...require("./isNumber"),
  ...require("./toBool"),
  ...require("./toDate"),
  ...require("./toDecimal"),
  ...require("./toDouble"),
  ...require("./toInt"),
  ...require("./toLong"),
  ...require("./toString"),
  ...require("./type")
});
