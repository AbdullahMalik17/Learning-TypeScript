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
var where_exports = {};
__export(where_exports, {
  $where: () => $where
});
module.exports = __toCommonJS(where_exports);
var import_util = require("../../../util");
function $where(_, rhs, options) {
  (0, import_util.assert)(
    options.scriptEnabled,
    "$where operator requires 'scriptEnabled' option to be true"
  );
  const f = rhs;
  (0, import_util.assert)((0, import_util.isFunction)(f), "$where only accepts a Function object");
  return (obj) => (0, import_util.truthy)(f.call(obj), options?.useStrictMode);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $where
});
