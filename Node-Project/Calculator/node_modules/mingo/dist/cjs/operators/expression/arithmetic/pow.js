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
var pow_exports = {};
__export(pow_exports, {
  $pow: () => $pow
});
module.exports = __toCommonJS(pow_exports);
var import_core = require("../../../core");
var import_util = require("../../../util");
const $pow = (obj, expr, options) => {
  const args = (0, import_core.computeValue)(obj, expr, null, options);
  (0, import_util.assert)(
    (0, import_util.isArray)(args) && args.length === 2 && args.every(import_util.isNumber),
    "$pow expression must resolve to array(2) of numbers"
  );
  (0, import_util.assert)(
    !(args[0] === 0 && args[1] < 0),
    "$pow cannot raise 0 to a negative exponent"
  );
  return Math.pow(args[0], args[1]);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $pow
});
