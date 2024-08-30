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
var let_exports = {};
__export(let_exports, {
  $let: () => $let
});
module.exports = __toCommonJS(let_exports);
var import_core = require("../../../core");
const $let = (obj, expr, options) => {
  const variables = {};
  for (const [key, val] of Object.entries(expr.vars)) {
    variables[key] = (0, import_core.computeValue)(obj, val, null, options);
  }
  return (0, import_core.computeValue)(
    obj,
    expr.in,
    null,
    import_core.ComputeOptions.init(options, obj, { variables })
  );
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $let
});
