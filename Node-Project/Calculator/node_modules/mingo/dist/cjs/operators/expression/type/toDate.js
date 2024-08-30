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
var toDate_exports = {};
__export(toDate_exports, {
  $toDate: () => $toDate
});
module.exports = __toCommonJS(toDate_exports);
var import_core = require("../../../core");
var import_util = require("../../../util");
var import_internal = require("./_internal");
const $toDate = (obj, expr, options) => {
  const val = (0, import_core.computeValue)(obj, expr, null, options);
  if (val instanceof Date)
    return val;
  if ((0, import_util.isNil)(val))
    return null;
  const d = new Date(val);
  const n = d.getTime();
  if (!isNaN(n))
    return d;
  throw new import_internal.TypeConvertError(`cannot convert '${val}' to date`);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $toDate
});
