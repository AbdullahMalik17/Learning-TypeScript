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
var elemMatch_exports = {};
__export(elemMatch_exports, {
  $elemMatch: () => $elemMatch
});
module.exports = __toCommonJS(elemMatch_exports);
var import_query = require("../../query");
var import_util = require("../../util");
const $elemMatch = (obj, expr, field, options) => {
  const arr = (0, import_util.resolve)(obj, field);
  const query = new import_query.Query(expr, options);
  (0, import_util.assert)(arr instanceof Array, "$elemMatch: argument must resolve to array");
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (query.test(arr[i])) {
      if (options.useStrictMode)
        return [arr[i]];
      result.push(arr[i]);
    }
  }
  return result.length > 0 ? result : void 0;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $elemMatch
});
