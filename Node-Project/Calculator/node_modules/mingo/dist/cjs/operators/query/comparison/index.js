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
var comparison_exports = {};
__export(comparison_exports, {
  $eq: () => import_eq.$eq,
  $gt: () => import_gt.$gt,
  $gte: () => import_gte.$gte,
  $in: () => import_in.$in,
  $lt: () => import_lt.$lt,
  $lte: () => import_lte.$lte,
  $ne: () => import_ne.$ne,
  $nin: () => import_nin.$nin
});
module.exports = __toCommonJS(comparison_exports);
var import_eq = require("./eq");
var import_gt = require("./gt");
var import_gte = require("./gte");
var import_in = require("./in");
var import_lt = require("./lt");
var import_lte = require("./lte");
var import_ne = require("./ne");
var import_nin = require("./nin");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $eq,
  $gt,
  $gte,
  $in,
  $lt,
  $lte,
  $ne,
  $nin
});
