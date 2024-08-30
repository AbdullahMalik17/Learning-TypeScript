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
var comparison_exports = {};
module.exports = __toCommonJS(comparison_exports);
__reExport(comparison_exports, require("./cmp"), module.exports);
__reExport(comparison_exports, require("./eq"), module.exports);
__reExport(comparison_exports, require("./gt"), module.exports);
__reExport(comparison_exports, require("./gte"), module.exports);
__reExport(comparison_exports, require("./lt"), module.exports);
__reExport(comparison_exports, require("./lte"), module.exports);
__reExport(comparison_exports, require("./ne"), module.exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ...require("./cmp"),
  ...require("./eq"),
  ...require("./gt"),
  ...require("./gte"),
  ...require("./lt"),
  ...require("./lte"),
  ...require("./ne")
});
