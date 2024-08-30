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
var slice_exports = {};
__export(slice_exports, {
  $slice: () => $slice
});
module.exports = __toCommonJS(slice_exports);
var import_util = require("../../util");
var import_slice = require("../expression/array/slice");
const $slice = (obj, expr, field, options) => {
  const xs = (0, import_util.resolve)(obj, field);
  const exprAsArray = expr;
  if (!(0, import_util.isArray)(xs))
    return xs;
  return (0, import_slice.$slice)(
    obj,
    expr instanceof Array ? [xs, ...exprAsArray] : [xs, expr],
    options
  );
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $slice
});
