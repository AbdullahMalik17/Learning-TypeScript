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
var split_exports = {};
__export(split_exports, {
  $split: () => $split
});
module.exports = __toCommonJS(split_exports);
var import_core = require("../../../core");
var import_util = require("../../../util");
const $split = (obj, expr, options) => {
  const args = (0, import_core.computeValue)(obj, expr, null, options);
  if ((0, import_util.isNil)(args[0]))
    return null;
  (0, import_util.assert)(
    args.every(import_util.isString),
    "$split expression must result to array(2) of strings"
  );
  return args[0].split(args[1]);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $split
});
