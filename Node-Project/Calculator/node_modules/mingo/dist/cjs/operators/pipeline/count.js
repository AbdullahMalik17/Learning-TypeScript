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
var count_exports = {};
__export(count_exports, {
  $count: () => $count
});
module.exports = __toCommonJS(count_exports);
var import_lazy = require("../../lazy");
var import_util = require("../../util");
const $count = (collection, expr, _) => {
  (0, import_util.assert)(
    (0, import_util.isString)(expr) && expr.trim() !== "" && expr.indexOf(".") === -1 && expr.trim()[0] !== "$",
    "Invalid expression value for $count"
  );
  return (0, import_lazy.Lazy)([
    {
      [expr]: collection.size()
    }
  ]);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $count
});
