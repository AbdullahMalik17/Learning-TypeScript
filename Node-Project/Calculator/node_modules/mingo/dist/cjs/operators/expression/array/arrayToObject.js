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
var arrayToObject_exports = {};
__export(arrayToObject_exports, {
  $arrayToObject: () => $arrayToObject
});
module.exports = __toCommonJS(arrayToObject_exports);
var import_core = require("../../../core");
var import_util = require("../../../util");
const $arrayToObject = (obj, expr, options) => {
  const arr = (0, import_core.computeValue)(obj, expr, null, options);
  (0, import_util.assert)((0, import_util.isArray)(arr), "$arrayToObject expression must resolve to an array");
  return arr.reduce((newObj, val) => {
    while ((0, import_util.isArray)(val) && val.length === 1)
      val = val[0];
    if (val instanceof Array && val.length == 2) {
      newObj[val[0]] = val[1];
    } else {
      const valObj = val;
      (0, import_util.assert)(
        (0, import_util.isObject)(valObj) && (0, import_util.has)(valObj, "k") && (0, import_util.has)(valObj, "v"),
        "$arrayToObject expression is invalid."
      );
      newObj[valObj.k] = valObj.v;
    }
    return newObj;
  }, {});
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $arrayToObject
});
