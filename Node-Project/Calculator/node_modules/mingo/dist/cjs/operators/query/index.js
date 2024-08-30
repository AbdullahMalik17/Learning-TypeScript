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
var query_exports = {};
module.exports = __toCommonJS(query_exports);
__reExport(query_exports, require("./array"), module.exports);
__reExport(query_exports, require("./bitwise"), module.exports);
__reExport(query_exports, require("./comparison"), module.exports);
__reExport(query_exports, require("./element"), module.exports);
__reExport(query_exports, require("./evaluation"), module.exports);
__reExport(query_exports, require("./logical"), module.exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ...require("./array"),
  ...require("./bitwise"),
  ...require("./comparison"),
  ...require("./element"),
  ...require("./evaluation"),
  ...require("./logical")
});
