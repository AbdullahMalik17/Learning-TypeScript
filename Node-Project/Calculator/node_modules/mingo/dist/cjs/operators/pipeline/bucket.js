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
var bucket_exports = {};
__export(bucket_exports, {
  $bucket: () => $bucket
});
module.exports = __toCommonJS(bucket_exports);
var import_core = require("../../core");
var import_lazy = require("../../lazy");
var import_util = require("../../util");
const $bucket = (collection, expr, options) => {
  const boundaries = [...expr.boundaries];
  const defaultKey = expr.default;
  const lower = boundaries[0];
  const upper = boundaries[boundaries.length - 1];
  const outputExpr = expr.output || { count: { $sum: 1 } };
  (0, import_util.assert)(
    expr.boundaries.length > 2,
    "$bucket 'boundaries' expression must have at least 3 elements"
  );
  const boundType = (0, import_util.getType)(lower);
  for (let i = 0, len = boundaries.length - 1; i < len; i++) {
    (0, import_util.assert)(
      boundType === (0, import_util.getType)(boundaries[i + 1]),
      "$bucket 'boundaries' must all be of the same type"
    );
    (0, import_util.assert)(
      (0, import_util.compare)(boundaries[i], boundaries[i + 1]) < 0,
      "$bucket 'boundaries' must be sorted in ascending order"
    );
  }
  !(0, import_util.isNil)(defaultKey) && (0, import_util.getType)(expr.default) === (0, import_util.getType)(lower) && (0, import_util.assert)(
    (0, import_util.compare)(expr.default, upper) >= 0 || (0, import_util.compare)(expr.default, lower) < 0,
    "$bucket 'default' expression must be out of boundaries range"
  );
  const grouped = {};
  for (const k of boundaries) {
    grouped[k] = [];
  }
  if (!(0, import_util.isNil)(defaultKey))
    grouped[defaultKey] = [];
  let iterator;
  return (0, import_lazy.Lazy)(() => {
    if (!iterator) {
      collection.each((obj) => {
        const key = (0, import_core.computeValue)(obj, expr.groupBy, null, options);
        if ((0, import_util.isNil)(key) || (0, import_util.compare)(key, lower) < 0 || (0, import_util.compare)(key, upper) >= 0) {
          (0, import_util.assert)(
            !(0, import_util.isNil)(defaultKey),
            "$bucket require a default for out of range values"
          );
          grouped[defaultKey].push(obj);
        } else {
          (0, import_util.assert)(
            (0, import_util.compare)(key, lower) >= 0 && (0, import_util.compare)(key, upper) < 0,
            "$bucket 'groupBy' expression must resolve to a value in range of boundaries"
          );
          const index = (0, import_util.findInsertIndex)(boundaries, key);
          const boundKey = boundaries[Math.max(0, index - 1)];
          grouped[boundKey].push(obj);
        }
      });
      boundaries.pop();
      if (!(0, import_util.isNil)(defaultKey))
        boundaries.push(defaultKey);
      iterator = (0, import_lazy.Lazy)(boundaries).map((key) => {
        const acc = (0, import_core.computeValue)(
          grouped[key],
          outputExpr,
          null,
          options
        );
        return (0, import_util.into)(acc, { _id: key });
      });
    }
    return iterator.next();
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $bucket
});
