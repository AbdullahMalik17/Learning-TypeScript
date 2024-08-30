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
var internal_exports = {};
__export(internal_exports, {
  createTrignometryOperator: () => createTrignometryOperator
});
module.exports = __toCommonJS(internal_exports);
var import_core = require("../../../core");
var import_util = require("../../../util");
const FIXED_POINTS = {
  undefined: null,
  null: null,
  NaN: NaN,
  Infinity: new Error(),
  "-Infinity": new Error()
};
function createTrignometryOperator(f, fixedPoints = FIXED_POINTS) {
  const fp = Object.assign({}, FIXED_POINTS, fixedPoints);
  const keySet = new Set(Object.keys(fp));
  return (obj, expr, options) => {
    const n = (0, import_core.computeValue)(obj, expr, null, options);
    if (keySet.has(`${n}`)) {
      const res = fp[`${n}`];
      if (res instanceof Error) {
        throw new import_util.MingoError(
          `cannot apply $${f.name} to -inf, value must in (-inf,inf)`
        );
      }
      return res;
    }
    return f(n);
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createTrignometryOperator
});
