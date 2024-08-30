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
var getField_exports = {};
__export(getField_exports, {
  $getField: () => $getField
});
module.exports = __toCommonJS(getField_exports);
var import_core = require("../../../core");
var import_util = require("../../../util");
const $getField = (obj, expr, options) => {
  const args = (0, import_core.computeValue)(obj, expr, null, options);
  const [field, input] = (0, import_util.isObject)(args) ? [args.field, args.input || obj] : [args, obj];
  if ((0, import_util.isNil)(input))
    return null;
  (0, import_util.assert)(
    (0, import_util.isObject)(input),
    "$getField expression 'input' must evaluate to an object"
  );
  (0, import_util.assert)(
    (0, import_util.isString)(field),
    "$getField expression 'field' must evaluate to a string"
  );
  return input[field];
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $getField
});
