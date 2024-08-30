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
var out_exports = {};
__export(out_exports, {
  $out: () => $out
});
module.exports = __toCommonJS(out_exports);
var import_util = require("../../util");
const $out = (collection, expr, options) => {
  const outputColl = (0, import_util.isString)(expr) ? options?.collectionResolver(expr) : expr;
  (0, import_util.assert)(outputColl instanceof Array, `expression must resolve to an array`);
  return collection.map((o) => {
    outputColl.push((0, import_util.cloneDeep)(o));
    return o;
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $out
});
