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
  MILLIS_PER_UNIT: () => MILLIS_PER_UNIT,
  rank: () => rank,
  withMemo: () => withMemo
});
module.exports = __toCommonJS(internal_exports);
var import_util = require("../../util");
var import_accumulator = require("../accumulator");
var import_internal = require("../expression/date/_internal");
var import_internal2 = require("../pipeline/_internal");
const MILLIS_PER_UNIT = {
  week: import_internal.MILLIS_PER_DAY * 7,
  day: import_internal.MILLIS_PER_DAY,
  hour: import_internal.MILLIS_PER_DAY / 24,
  minute: 6e4,
  second: 1e3,
  millisecond: 1
};
const memo = /* @__PURE__ */ new WeakMap();
function withMemo(collection, expr, cacheFn, fn) {
  if (!(0, import_internal2.isUnbounded)(expr.parentExpr.output[expr.field].window)) {
    return fn(cacheFn());
  }
  if (!memo.has(collection)) {
    memo.set(collection, { [expr.field]: cacheFn() });
  }
  const data = memo.get(collection);
  if (data[expr.field] === void 0) {
    data[expr.field] = cacheFn();
  }
  let failed = false;
  try {
    return fn(data[expr.field]);
  } catch (e) {
    failed = true;
  } finally {
    if (failed || expr.documentNumber === collection.length) {
      delete data[expr.field];
      if (Object.keys(data).length === 0)
        memo.delete(collection);
    }
  }
}
function rank(_, collection, expr, options, dense) {
  return withMemo(
    collection,
    expr,
    () => {
      const sortKey = "$" + Object.keys(expr.parentExpr.sortBy)[0];
      const values = (0, import_accumulator.$push)(collection, sortKey, options);
      const groups = (0, import_util.groupBy)(
        values,
        (_2, n) => values[n],
        options.hashFunction
      );
      return { values, groups };
    },
    (input) => {
      const { values, groups: partitions } = input;
      if (partitions.size == collection.length) {
        return expr.documentNumber;
      }
      const current = values[expr.documentNumber - 1];
      let i = 0;
      let offset = 0;
      for (const key of partitions.keys()) {
        if ((0, import_util.isEqual)(current, key)) {
          return dense ? i + 1 : offset + 1;
        }
        i++;
        offset += partitions.get(key).length;
      }
      throw new import_util.MingoError(
        "rank: invalid return value. please submit a bug report."
      );
    }
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MILLIS_PER_UNIT,
  rank,
  withMemo
});
