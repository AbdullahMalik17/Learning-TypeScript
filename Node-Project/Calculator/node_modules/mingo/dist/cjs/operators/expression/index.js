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
var expression_exports = {};
module.exports = __toCommonJS(expression_exports);
__reExport(expression_exports, require("./arithmetic"), module.exports);
__reExport(expression_exports, require("./array"), module.exports);
__reExport(expression_exports, require("./bitwise"), module.exports);
__reExport(expression_exports, require("./boolean"), module.exports);
__reExport(expression_exports, require("./comparison"), module.exports);
__reExport(expression_exports, require("./conditional"), module.exports);
__reExport(expression_exports, require("./custom"), module.exports);
__reExport(expression_exports, require("./date"), module.exports);
__reExport(expression_exports, require("./literal"), module.exports);
__reExport(expression_exports, require("./median"), module.exports);
__reExport(expression_exports, require("./misc"), module.exports);
__reExport(expression_exports, require("./object"), module.exports);
__reExport(expression_exports, require("./percentile"), module.exports);
__reExport(expression_exports, require("./set"), module.exports);
__reExport(expression_exports, require("./string"), module.exports);
__reExport(expression_exports, require("./trignometry"), module.exports);
__reExport(expression_exports, require("./type"), module.exports);
__reExport(expression_exports, require("./variable"), module.exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ...require("./arithmetic"),
  ...require("./array"),
  ...require("./bitwise"),
  ...require("./boolean"),
  ...require("./comparison"),
  ...require("./conditional"),
  ...require("./custom"),
  ...require("./date"),
  ...require("./literal"),
  ...require("./median"),
  ...require("./misc"),
  ...require("./object"),
  ...require("./percentile"),
  ...require("./set"),
  ...require("./string"),
  ...require("./trignometry"),
  ...require("./type"),
  ...require("./variable")
});
