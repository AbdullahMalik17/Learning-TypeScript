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
var cond_exports = {};
__export(cond_exports, {
  $cond: () => $cond
});
module.exports = __toCommonJS(cond_exports);
var import_core = require("../../../core");
var import_util = require("../../../util");
const $cond = (obj, expr, options) => {
  let ifExpr;
  let thenExpr;
  let elseExpr;
  const errorMsg = "$cond: invalid arguments";
  if (expr instanceof Array) {
    (0, import_util.assert)(expr.length === 3, errorMsg);
    ifExpr = expr[0];
    thenExpr = expr[1];
    elseExpr = expr[2];
  } else {
    (0, import_util.assert)((0, import_util.isObject)(expr), errorMsg);
    ifExpr = expr.if;
    thenExpr = expr.then;
    elseExpr = expr.else;
  }
  const condition = (0, import_util.truthy)(
    (0, import_core.computeValue)(obj, ifExpr, null, options),
    options.useStrictMode
  );
  return (0, import_core.computeValue)(obj, condition ? thenExpr : elseExpr, null, options);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $cond
});
