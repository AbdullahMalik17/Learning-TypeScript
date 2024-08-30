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
var group_exports = {};
__export(group_exports, {
  $group: () => $group
});
module.exports = __toCommonJS(group_exports);
var import_core = require("../../core");
var import_util = require("../../util");
const ID_KEY = "_id";
const $group = (collection, expr, options) => {
  (0, import_util.assert)((0, import_util.has)(expr, ID_KEY), "a group specification must include an _id");
  const idExpr = expr[ID_KEY];
  const copts = import_core.ComputeOptions.init(options);
  return collection.transform((coll) => {
    const partitions = (0, import_util.groupBy)(
      coll,
      (obj) => (0, import_core.computeValue)(obj, idExpr, null, options),
      options.hashFunction
    );
    expr = { ...expr };
    delete expr[ID_KEY];
    let i = -1;
    const partitionKeys = Array.from(partitions.keys());
    const size = partitions.size;
    return () => {
      if (++i === size)
        return { done: true };
      const groupId = partitionKeys[i];
      const obj = {};
      if (groupId !== void 0) {
        obj[ID_KEY] = groupId;
      }
      for (const [key, val] of Object.entries(expr)) {
        obj[key] = (0, import_core.computeValue)(
          partitions.get(groupId),
          val,
          key,
          copts.update(null, { groupId })
        );
      }
      return { value: obj, done: false };
    };
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $group
});
