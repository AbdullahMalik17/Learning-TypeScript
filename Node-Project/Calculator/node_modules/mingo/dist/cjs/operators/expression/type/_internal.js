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
var internal_exports = {};
__export(internal_exports, {
  TypeConvertError: () => TypeConvertError,
  toInteger: () => toInteger
});
module.exports = __toCommonJS(internal_exports);
var import_core = require("../../../core");
var import_util = require("../../../util");
class TypeConvertError extends Error {
  constructor(message) {
    super(message);
  }
}
function toInteger(obj, expr, options, max, min, typename) {
  const val = (0, import_core.computeValue)(obj, expr, null, options);
  if ((0, import_util.isNil)(val))
    return null;
  if (val instanceof Date)
    return val.getTime();
  if (val === true)
    return 1;
  if (val === false)
    return 0;
  const n = Number(val);
  if ((0, import_util.isNumber)(n) && n >= min && n <= max) {
    if (!(0, import_util.isString)(val) || n.toString().indexOf(".") === -1) {
      return Math.trunc(n);
    }
  }
  throw new TypeConvertError(`cannot convert '${val}' to ${typename}`);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TypeConvertError,
  toInteger
});
