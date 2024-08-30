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
var push_exports = {};
__export(push_exports, {
  $push: () => $push
});
module.exports = __toCommonJS(push_exports);
var import_util = require("../../util");
var import_internal = require("./_internal");
const OPERATOR_MODIFIERS = Object.freeze([
  "$each",
  "$slice",
  "$sort",
  "$position"
]);
const $push = (obj, expr, arrayFilters = [], options = {}) => {
  return (0, import_internal.walkExpression)(expr, arrayFilters, options, (val, node, queries) => {
    const args = {
      $each: [val]
    };
    if ((0, import_util.isObject)(val) && OPERATOR_MODIFIERS.some((m) => (0, import_util.has)(val, m))) {
      Object.assign(args, val);
    }
    return (0, import_internal.applyUpdate)(
      obj,
      node,
      queries,
      (o, k) => {
        const arr = o[k] ||= [];
        const prev = arr.slice(0, args.$slice || arr.length);
        const oldsize = arr.length;
        const pos = (0, import_util.isNumber)(args.$position) ? args.$position : arr.length;
        arr.splice(
          pos,
          0,
          ...(0, import_internal.clone)(options.cloneMode, args.$each)
        );
        if (args.$sort) {
          const sortKey = (0, import_util.isObject)(args.$sort) ? Object.keys(args.$sort || {}).pop() : "";
          const order = !sortKey ? args.$sort : args.$sort[sortKey];
          const f = !sortKey ? (a) => a : (a) => (0, import_util.resolve)(a, sortKey);
          arr.sort((a, b) => order * (0, import_util.compare)(f(a), f(b)));
        }
        if ((0, import_util.isNumber)(args.$slice)) {
          if (args.$slice < 0)
            arr.splice(0, arr.length + args.$slice);
          else
            arr.splice(args.$slice);
        }
        return oldsize != arr.length || !(0, import_util.isEqual)(prev, arr);
      },
      { descendArray: true, buildGraph: true }
    );
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $push
});
