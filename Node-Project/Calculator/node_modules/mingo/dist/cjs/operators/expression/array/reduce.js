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
var reduce_exports = {};
__export(reduce_exports, {
  $reduce: () => $reduce
});
module.exports = __toCommonJS(reduce_exports);
var import_core = require("../../../core");
var import_util = require("../../../util");
const $reduce = (obj, expr, options) => {
  const copts = import_core.ComputeOptions.init(options);
  const input = (0, import_core.computeValue)(obj, expr.input, null, copts);
  const initialValue = (0, import_core.computeValue)(obj, expr.initialValue, null, copts);
  const inExpr = expr["in"];
  if ((0, import_util.isNil)(input))
    return null;
  (0, import_util.assert)((0, import_util.isArray)(input), "$reduce 'input' expression must resolve to an array");
  return input.reduce((acc, n) => {
    return (0, import_core.computeValue)(
      n,
      inExpr,
      null,
      copts.update(copts.root, {
        variables: { value: acc }
      })
    );
  }, initialValue);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $reduce
});
