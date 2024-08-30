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
var pipeline_exports = {};
module.exports = __toCommonJS(pipeline_exports);
__reExport(pipeline_exports, require("./addFields"), module.exports);
__reExport(pipeline_exports, require("./bucket"), module.exports);
__reExport(pipeline_exports, require("./bucketAuto"), module.exports);
__reExport(pipeline_exports, require("./count"), module.exports);
__reExport(pipeline_exports, require("./facet"), module.exports);
__reExport(pipeline_exports, require("./fill"), module.exports);
__reExport(pipeline_exports, require("./group"), module.exports);
__reExport(pipeline_exports, require("./limit"), module.exports);
__reExport(pipeline_exports, require("./lookup"), module.exports);
__reExport(pipeline_exports, require("./match"), module.exports);
__reExport(pipeline_exports, require("./merge"), module.exports);
__reExport(pipeline_exports, require("./out"), module.exports);
__reExport(pipeline_exports, require("./project"), module.exports);
__reExport(pipeline_exports, require("./redact"), module.exports);
__reExport(pipeline_exports, require("./replaceRoot"), module.exports);
__reExport(pipeline_exports, require("./replaceWith"), module.exports);
__reExport(pipeline_exports, require("./sample"), module.exports);
__reExport(pipeline_exports, require("./set"), module.exports);
__reExport(pipeline_exports, require("./setWindowFields"), module.exports);
__reExport(pipeline_exports, require("./skip"), module.exports);
__reExport(pipeline_exports, require("./sort"), module.exports);
__reExport(pipeline_exports, require("./sortByCount"), module.exports);
__reExport(pipeline_exports, require("./unionWith"), module.exports);
__reExport(pipeline_exports, require("./unset"), module.exports);
__reExport(pipeline_exports, require("./unwind"), module.exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ...require("./addFields"),
  ...require("./bucket"),
  ...require("./bucketAuto"),
  ...require("./count"),
  ...require("./facet"),
  ...require("./fill"),
  ...require("./group"),
  ...require("./limit"),
  ...require("./lookup"),
  ...require("./match"),
  ...require("./merge"),
  ...require("./out"),
  ...require("./project"),
  ...require("./redact"),
  ...require("./replaceRoot"),
  ...require("./replaceWith"),
  ...require("./sample"),
  ...require("./set"),
  ...require("./setWindowFields"),
  ...require("./skip"),
  ...require("./sort"),
  ...require("./sortByCount"),
  ...require("./unionWith"),
  ...require("./unset"),
  ...require("./unwind")
});
