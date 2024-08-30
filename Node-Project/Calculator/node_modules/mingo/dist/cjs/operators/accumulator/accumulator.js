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
var accumulator_exports = {};
__export(accumulator_exports, {
  $accumulator: () => $accumulator
});
module.exports = __toCommonJS(accumulator_exports);
var import_core = require("../../core");
var import_util = require("../../util");
const $accumulator = (collection, expr, options) => {
  (0, import_util.assert)(
    !!options && options.scriptEnabled,
    "$accumulator operator requires 'scriptEnabled' option to be true"
  );
  if (collection.length == 0)
    return expr.initArgs;
  const copts = import_core.ComputeOptions.init(options);
  const initArgs = (0, import_core.computeValue)(
    {},
    expr.initArgs || [],
    null,
    copts.update(copts?.local?.groupId || {})
  );
  let state = expr.init.call(null, ...initArgs);
  for (const doc of collection) {
    const args = (0, import_core.computeValue)(
      doc,
      expr.accumulateArgs,
      null,
      copts.update(doc)
    );
    state = expr.accumulate.call(null, ...[state, ...args]);
  }
  return expr.finalize ? expr.finalize.call(null, state) : state;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $accumulator
});
