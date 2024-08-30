var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var sortArray_exports = {};
__export(sortArray_exports, {
  $sortArray: () => $sortArray
});
module.exports = __toCommonJS(sortArray_exports);
var import_aggregator = require("../../../aggregator");
var import_core = require("../../../core");
var import_util = require("../../../util");
const $sortArray = (obj, expr, options) => {
  const { input, sortBy } = (0, import_core.computeValue)(obj, expr, null, options);
  if ((0, import_util.isNil)(input))
    return null;
  (0, import_util.assert)((0, import_util.isArray)(input), "$sortArray expression must resolve to an array");
  if ((0, import_util.isObject)(sortBy)) {
    return new import_aggregator.Aggregator([{ $sort: sortBy }]).run(input);
  }
  const result = [...input];
  result.sort(import_util.compare);
  if (sortBy === -1)
    result.reverse();
  return result;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $sortArray
});
