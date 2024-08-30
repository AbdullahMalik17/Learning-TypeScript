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
var locf_exports = {};
__export(locf_exports, {
  $locf: () => $locf
});
module.exports = __toCommonJS(locf_exports);
var import_util = require("../../util");
var import_push = require("../accumulator/push");
var import_internal = require("./_internal");
function $locf(_, collection, expr, options) {
  return (0, import_internal.withMemo)(
    collection,
    expr,
    () => {
      const values = (0, import_push.$push)(collection, expr.inputExpr, options);
      for (let i = 1; i < values.length; i++) {
        if ((0, import_util.isNil)(values[i]))
          values[i] = values[i - 1];
      }
      return values;
    },
    (series) => series[expr.documentNumber - 1]
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $locf
});
