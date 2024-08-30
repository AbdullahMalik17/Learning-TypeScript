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
var accumulator_exports = {};
module.exports = __toCommonJS(accumulator_exports);
__reExport(accumulator_exports, require("./accumulator"), module.exports);
__reExport(accumulator_exports, require("./addToSet"), module.exports);
__reExport(accumulator_exports, require("./avg"), module.exports);
__reExport(accumulator_exports, require("./bottom"), module.exports);
__reExport(accumulator_exports, require("./bottomN"), module.exports);
__reExport(accumulator_exports, require("./count"), module.exports);
__reExport(accumulator_exports, require("./covariancePop"), module.exports);
__reExport(accumulator_exports, require("./covarianceSamp"), module.exports);
__reExport(accumulator_exports, require("./first"), module.exports);
__reExport(accumulator_exports, require("./firstN"), module.exports);
__reExport(accumulator_exports, require("./last"), module.exports);
__reExport(accumulator_exports, require("./lastN"), module.exports);
__reExport(accumulator_exports, require("./max"), module.exports);
__reExport(accumulator_exports, require("./maxN"), module.exports);
__reExport(accumulator_exports, require("./median"), module.exports);
__reExport(accumulator_exports, require("./mergeObjects"), module.exports);
__reExport(accumulator_exports, require("./min"), module.exports);
__reExport(accumulator_exports, require("./minN"), module.exports);
__reExport(accumulator_exports, require("./percentile"), module.exports);
__reExport(accumulator_exports, require("./push"), module.exports);
__reExport(accumulator_exports, require("./stdDevPop"), module.exports);
__reExport(accumulator_exports, require("./stdDevSamp"), module.exports);
__reExport(accumulator_exports, require("./sum"), module.exports);
__reExport(accumulator_exports, require("./top"), module.exports);
__reExport(accumulator_exports, require("./topN"), module.exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ...require("./accumulator"),
  ...require("./addToSet"),
  ...require("./avg"),
  ...require("./bottom"),
  ...require("./bottomN"),
  ...require("./count"),
  ...require("./covariancePop"),
  ...require("./covarianceSamp"),
  ...require("./first"),
  ...require("./firstN"),
  ...require("./last"),
  ...require("./lastN"),
  ...require("./max"),
  ...require("./maxN"),
  ...require("./median"),
  ...require("./mergeObjects"),
  ...require("./min"),
  ...require("./minN"),
  ...require("./percentile"),
  ...require("./push"),
  ...require("./stdDevPop"),
  ...require("./stdDevSamp"),
  ...require("./sum"),
  ...require("./top"),
  ...require("./topN")
});
