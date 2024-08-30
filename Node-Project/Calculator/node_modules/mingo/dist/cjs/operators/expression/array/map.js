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
var map_exports = {};
__export(map_exports, {
  $map: () => $map
});
module.exports = __toCommonJS(map_exports);
var import_core = require("../../../core");
var import_util = require("../../../util");
const $map = (obj, expr, options) => {
  const input = (0, import_core.computeValue)(obj, expr.input, null, options);
  (0, import_util.assert)((0, import_util.isArray)(input), `$map 'input' expression must resolve to an array`);
  const copts = import_core.ComputeOptions.init(options);
  const k = expr.as || "this";
  return input.map((o) => {
    return (0, import_core.computeValue)(
      obj,
      expr.in,
      null,
      copts.update(copts.root, {
        variables: { [k]: o }
      })
    );
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $map
});
