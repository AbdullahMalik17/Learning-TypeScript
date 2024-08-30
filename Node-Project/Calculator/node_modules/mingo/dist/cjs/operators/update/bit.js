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
var bit_exports = {};
__export(bit_exports, {
  $bit: () => $bit
});
module.exports = __toCommonJS(bit_exports);
var import_util = require("../../util");
var import_internal = require("./_internal");
const BIT_OPS = /* @__PURE__ */ new Set(["and", "or", "xor"]);
const $bit = (obj, expr, arrayFilters = [], options = {}) => {
  return (0, import_internal.walkExpression)(expr, arrayFilters, options, (val, node, queries) => {
    const op = Object.keys(val);
    (0, import_util.assert)(
      op.length === 1 && BIT_OPS.has(op[0]),
      `Invalid bit operator '${op[0]}'. Must be one of 'and', 'or', or 'xor'.`
    );
    return (0, import_internal.applyUpdate)(
      obj,
      node,
      queries,
      (o, k) => {
        let n = o[k];
        const v = val[op[0]];
        if (n !== void 0 && !((0, import_util.isNumber)(n) && (0, import_util.isNumber)(v)))
          return false;
        n = n || 0;
        switch (op[0]) {
          case "and":
            o[k] = n & v;
            break;
          case "or":
            o[k] = n | v;
            break;
          case "xor":
            o[k] = n ^ v;
            break;
        }
        return o[k] !== n;
      },
      { buildGraph: true }
    );
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $bit
});
