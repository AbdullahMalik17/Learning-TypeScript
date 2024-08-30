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
var lookup_exports = {};
__export(lookup_exports, {
  $lookup: () => $lookup
});
module.exports = __toCommonJS(lookup_exports);
var import_util = require("../../util");
const $lookup = (collection, expr, options) => {
  const joinColl = (0, import_util.isString)(expr.from) ? options?.collectionResolver(expr.from) : expr.from;
  (0, import_util.assert)(joinColl instanceof Array, `'from' field must resolve to an array`);
  const hash = {};
  for (const obj of joinColl) {
    const k = (0, import_util.hashCode)((0, import_util.resolve)(obj, expr.foreignField), options?.hashFunction);
    hash[k] = hash[k] || [];
    hash[k].push(obj);
  }
  return collection.map((obj) => {
    const k = (0, import_util.hashCode)((0, import_util.resolve)(obj, expr.localField), options?.hashFunction);
    const newObj = (0, import_util.into)({}, obj);
    newObj[expr.as] = hash[k] || [];
    return newObj;
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $lookup
});
