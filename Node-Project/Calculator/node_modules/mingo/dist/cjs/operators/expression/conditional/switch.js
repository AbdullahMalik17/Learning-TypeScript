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
var switch_exports = {};
__export(switch_exports, {
  $switch: () => $switch
});
module.exports = __toCommonJS(switch_exports);
var import_core = require("../../../core");
var import_util = require("../../../util");
const $switch = (obj, expr, options) => {
  let thenExpr = null;
  expr.branches.some((b) => {
    const condition = (0, import_util.truthy)(
      (0, import_core.computeValue)(obj, b.case, null, options),
      options.useStrictMode
    );
    if (condition)
      thenExpr = b.then;
    return condition;
  });
  return (0, import_core.computeValue)(
    obj,
    thenExpr !== null ? thenExpr : expr.default,
    null,
    options
  );
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $switch
});
