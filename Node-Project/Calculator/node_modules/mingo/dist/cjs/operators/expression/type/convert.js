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
var convert_exports = {};
__export(convert_exports, {
  $convert: () => $convert
});
module.exports = __toCommonJS(convert_exports);
var import_core = require("../../../core");
var import_util = require("../../../util");
var import_internal = require("./_internal");
var import_toBool = require("./toBool");
var import_toDate = require("./toDate");
var import_toDouble = require("./toDouble");
var import_toInt = require("./toInt");
var import_toLong = require("./toLong");
var import_toString = require("./toString");
const $convert = (obj, expr, options) => {
  const args = (0, import_core.computeValue)(obj, expr, null, options);
  args.onNull = args.onNull === void 0 ? null : args.onNull;
  if ((0, import_util.isNil)(args.input))
    return args.onNull;
  try {
    switch (args.to) {
      case 2:
      case "string":
        return (0, import_toString.$toString)(obj, args.input, options);
      case 8:
      case "boolean":
      case "bool":
        return (0, import_toBool.$toBool)(obj, args.input, options);
      case 9:
      case "date":
        return (0, import_toDate.$toDate)(obj, args.input, options);
      case 1:
      case 19:
      case "double":
      case "decimal":
      case "number":
        return (0, import_toDouble.$toDouble)(obj, args.input, options);
      case 16:
      case "int":
        return (0, import_toInt.$toInt)(obj, args.input, options);
      case 18:
      case "long":
        return (0, import_toLong.$toLong)(obj, args.input, options);
    }
  } catch (e) {
  }
  if (args.onError !== void 0)
    return args.onError;
  throw new import_internal.TypeConvertError(`could not convert to type ${args.to}.`);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $convert
});
