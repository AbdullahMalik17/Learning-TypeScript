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
var update_exports = {};
module.exports = __toCommonJS(update_exports);
__reExport(update_exports, require("./addToSet"), module.exports);
__reExport(update_exports, require("./bit"), module.exports);
__reExport(update_exports, require("./currentDate"), module.exports);
__reExport(update_exports, require("./inc"), module.exports);
__reExport(update_exports, require("./max"), module.exports);
__reExport(update_exports, require("./min"), module.exports);
__reExport(update_exports, require("./mul"), module.exports);
__reExport(update_exports, require("./pop"), module.exports);
__reExport(update_exports, require("./pull"), module.exports);
__reExport(update_exports, require("./pullAll"), module.exports);
__reExport(update_exports, require("./push"), module.exports);
__reExport(update_exports, require("./rename"), module.exports);
__reExport(update_exports, require("./set"), module.exports);
__reExport(update_exports, require("./unset"), module.exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ...require("./addToSet"),
  ...require("./bit"),
  ...require("./currentDate"),
  ...require("./inc"),
  ...require("./max"),
  ...require("./min"),
  ...require("./mul"),
  ...require("./pop"),
  ...require("./pull"),
  ...require("./pullAll"),
  ...require("./push"),
  ...require("./rename"),
  ...require("./set"),
  ...require("./unset")
});
