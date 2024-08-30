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
var arithmetic_exports = {};
module.exports = __toCommonJS(arithmetic_exports);
__reExport(arithmetic_exports, require("./abs"), module.exports);
__reExport(arithmetic_exports, require("./add"), module.exports);
__reExport(arithmetic_exports, require("./ceil"), module.exports);
__reExport(arithmetic_exports, require("./divide"), module.exports);
__reExport(arithmetic_exports, require("./exp"), module.exports);
__reExport(arithmetic_exports, require("./floor"), module.exports);
__reExport(arithmetic_exports, require("./ln"), module.exports);
__reExport(arithmetic_exports, require("./log"), module.exports);
__reExport(arithmetic_exports, require("./log10"), module.exports);
__reExport(arithmetic_exports, require("./mod"), module.exports);
__reExport(arithmetic_exports, require("./multiply"), module.exports);
__reExport(arithmetic_exports, require("./pow"), module.exports);
__reExport(arithmetic_exports, require("./round"), module.exports);
__reExport(arithmetic_exports, require("./sqrt"), module.exports);
__reExport(arithmetic_exports, require("./subtract"), module.exports);
__reExport(arithmetic_exports, require("./trunc"), module.exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ...require("./abs"),
  ...require("./add"),
  ...require("./ceil"),
  ...require("./divide"),
  ...require("./exp"),
  ...require("./floor"),
  ...require("./ln"),
  ...require("./log"),
  ...require("./log10"),
  ...require("./mod"),
  ...require("./multiply"),
  ...require("./pow"),
  ...require("./round"),
  ...require("./sqrt"),
  ...require("./subtract"),
  ...require("./trunc")
});
