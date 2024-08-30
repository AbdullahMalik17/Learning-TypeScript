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
var toString_exports = {};
__export(toString_exports, {
  $toString: () => $toString
});
module.exports = __toCommonJS(toString_exports);
var import_core = require("../../../core");
var import_util = require("../../../util");
var import_dateToString = require("../date/dateToString");
const $toString = (obj, expr, options) => {
  const val = (0, import_core.computeValue)(obj, expr, null, options);
  if ((0, import_util.isNil)(val))
    return null;
  if (val instanceof Date) {
    const dateExpr = {
      date: expr,
      format: "%Y-%m-%dT%H:%M:%S.%LZ"
    };
    return (0, import_dateToString.$dateToString)(obj, dateExpr, options);
  } else {
    return val.toString();
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $toString
});
