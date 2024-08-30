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
var percentile_exports = {};
__export(percentile_exports, {
  $percentile: () => $percentile
});
module.exports = __toCommonJS(percentile_exports);
var import_util = require("../../util");
var import_push = require("./push");
const $percentile = (collection, expr, options) => {
  const X = (0, import_push.$push)(collection, expr.input, options).filter(import_util.isNumber).sort();
  const centiles = (0, import_push.$push)(expr.p, "$$CURRENT", options).filter(import_util.isNumber);
  const method = expr.method || "approximate";
  return centiles.map((p) => {
    (0, import_util.assert)(
      p > 0 && p <= 1,
      `percentile value must be between 0 (exclusive) and 1 (inclusive): invalid '${p}'.`
    );
    const r = p * (X.length - 1) + 1;
    const ri = Math.floor(r);
    const result = r === ri ? X[r - 1] : X[ri - 1] + r % 1 * (X[ri] - X[ri - 1] || 0);
    switch (method) {
      case "exact":
        return result;
      case "approximate": {
        const i = (0, import_util.findInsertIndex)(X, result);
        return i / X.length >= p ? X[Math.max(i - 1, 0)] : X[i];
      }
    }
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $percentile
});
