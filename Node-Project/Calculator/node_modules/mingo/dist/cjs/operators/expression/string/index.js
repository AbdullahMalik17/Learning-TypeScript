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
var string_exports = {};
module.exports = __toCommonJS(string_exports);
__reExport(string_exports, require("./concat"), module.exports);
__reExport(string_exports, require("./indexOfBytes"), module.exports);
__reExport(string_exports, require("./ltrim"), module.exports);
__reExport(string_exports, require("./regexFind"), module.exports);
__reExport(string_exports, require("./regexFindAll"), module.exports);
__reExport(string_exports, require("./regexMatch"), module.exports);
__reExport(string_exports, require("./replaceAll"), module.exports);
__reExport(string_exports, require("./replaceOne"), module.exports);
__reExport(string_exports, require("./rtrim"), module.exports);
__reExport(string_exports, require("./split"), module.exports);
__reExport(string_exports, require("./strcasecmp"), module.exports);
__reExport(string_exports, require("./strLenBytes"), module.exports);
__reExport(string_exports, require("./strLenCP"), module.exports);
__reExport(string_exports, require("./substr"), module.exports);
__reExport(string_exports, require("./substrBytes"), module.exports);
__reExport(string_exports, require("./substrCP"), module.exports);
__reExport(string_exports, require("./toLower"), module.exports);
__reExport(string_exports, require("./toUpper"), module.exports);
__reExport(string_exports, require("./trim"), module.exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ...require("./concat"),
  ...require("./indexOfBytes"),
  ...require("./ltrim"),
  ...require("./regexFind"),
  ...require("./regexFindAll"),
  ...require("./regexMatch"),
  ...require("./replaceAll"),
  ...require("./replaceOne"),
  ...require("./rtrim"),
  ...require("./split"),
  ...require("./strcasecmp"),
  ...require("./strLenBytes"),
  ...require("./strLenCP"),
  ...require("./substr"),
  ...require("./substrBytes"),
  ...require("./substrCP"),
  ...require("./toLower"),
  ...require("./toUpper"),
  ...require("./trim")
});
