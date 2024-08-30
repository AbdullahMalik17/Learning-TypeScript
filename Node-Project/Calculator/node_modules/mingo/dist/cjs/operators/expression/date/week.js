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
var week_exports = {};
__export(week_exports, {
  $week: () => $week
});
module.exports = __toCommonJS(week_exports);
var import_internal = require("./_internal");
const $week = (obj, expr, options) => {
  const d = (0, import_internal.computeDate)(obj, expr, options);
  const result = (0, import_internal.isoWeek)(d);
  if (d.getUTCDay() > 0 && d.getUTCDate() == 1 && d.getUTCMonth() == 0)
    return 0;
  if (d.getUTCDay() == 0)
    return result + 1;
  return result;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $week
});
