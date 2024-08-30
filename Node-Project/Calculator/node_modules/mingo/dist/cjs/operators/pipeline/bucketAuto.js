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
var bucketAuto_exports = {};
__export(bucketAuto_exports, {
  $bucketAuto: () => $bucketAuto
});
module.exports = __toCommonJS(bucketAuto_exports);
var import_core = require("../../core");
var import_util = require("../../util");
const ID_KEY = "_id";
const $bucketAuto = (collection, expr, options) => {
  const outputExpr = expr.output || { count: { $sum: 1 } };
  const groupByExpr = expr.groupBy;
  const bucketCount = expr.buckets;
  (0, import_util.assert)(
    bucketCount > 0,
    `The $bucketAuto 'buckets' field must be greater than 0, but found: ${bucketCount}`
  );
  return collection.transform((coll) => {
    const approxBucketSize = Math.max(1, Math.round(coll.length / bucketCount));
    const computeValueOptimized = (0, import_util.memoize)(import_core.computeValue, options?.hashFunction);
    const grouped = /* @__PURE__ */ new Map();
    const remaining = [];
    const sorted = (0, import_util.sortBy)(coll, (o) => {
      const key = computeValueOptimized(o, groupByExpr, null, options);
      if ((0, import_util.isNil)(key)) {
        remaining.push(o);
      } else {
        if (!grouped.has(key))
          grouped.set(key, []);
        grouped.get(key).push(o);
      }
      return key;
    });
    const result = [];
    let index = 0;
    for (let i = 0, len = sorted.length; i < bucketCount && index < len; i++) {
      const boundaries = {};
      const bucketItems = [];
      for (let j = 0; j < approxBucketSize && index < len; j++) {
        let key = computeValueOptimized(
          sorted[index],
          groupByExpr,
          null,
          options
        );
        if ((0, import_util.isNil)(key))
          key = null;
        (0, import_util.into)(bucketItems, (0, import_util.isNil)(key) ? remaining : grouped.get(key));
        index += (0, import_util.isNil)(key) ? remaining.length : grouped.get(key).length;
        if (!(0, import_util.has)(boundaries, "min"))
          boundaries.min = key;
        if (result.length > 0) {
          const lastBucket = result[result.length - 1];
          lastBucket[ID_KEY].max = boundaries.min;
        }
      }
      if (i == bucketCount - 1) {
        (0, import_util.into)(bucketItems, sorted.slice(index));
      }
      const values = (0, import_core.computeValue)(
        bucketItems,
        outputExpr,
        null,
        options
      );
      result.push(
        (0, import_util.into)(values, {
          _id: boundaries
        })
      );
    }
    if (result.length > 0) {
      result[result.length - 1][ID_KEY].max = computeValueOptimized(
        sorted[sorted.length - 1],
        groupByExpr,
        null,
        options
      );
    }
    return result;
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $bucketAuto
});
