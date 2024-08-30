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
var merge_exports = {};
__export(merge_exports, {
  $merge: () => $merge
});
module.exports = __toCommonJS(merge_exports);
var import_aggregator = require("../../aggregator");
var import_core = require("../../core");
var import_util = require("../../util");
var import_expression = require("../expression");
const $merge = (collection, expr, options) => {
  const output = (0, import_util.isString)(expr.into) ? options?.collectionResolver(expr.into) : expr.into;
  (0, import_util.assert)(
    output instanceof Array,
    `$merge: option 'into' must resolve to an array`
  );
  const onField = expr.on || options.idKey;
  const getHash = (o) => {
    const val = (0, import_util.isString)(onField) ? (0, import_util.resolve)(o, onField) : onField.map((s) => (0, import_util.resolve)(o, s));
    return (0, import_util.hashCode)(val, options.hashFunction);
  };
  const hash = {};
  for (let i = 0; i < output.length; i++) {
    const obj = output[i];
    const k = getHash(obj);
    (0, import_util.assert)(
      !hash[k],
      "$merge: 'into' collection must have unique entries for the 'on' field."
    );
    hash[k] = [obj, i];
  }
  const copts = import_core.ComputeOptions.init(options);
  return collection.map((o) => {
    const k = getHash(o);
    if (hash[k]) {
      const [target, i] = hash[k];
      const variables = (0, import_core.computeValue)(
        target,
        expr.let || { new: "$$ROOT" },
        null,
        // 'root' is the item from the iteration.
        copts.update(o)
      );
      if ((0, import_util.isArray)(expr.whenMatched)) {
        const aggregator = new import_aggregator.Aggregator(expr.whenMatched, {
          ...options,
          variables
        });
        output[i] = aggregator.run([target])[0];
      } else {
        switch (expr.whenMatched) {
          case "replace":
            output[i] = o;
            break;
          case "fail":
            throw new import_util.MingoError(
              "$merge: failed due to matching as specified by 'whenMatched' option."
            );
          case "keepExisting":
            break;
          case "merge":
          default:
            output[i] = (0, import_expression.$mergeObjects)(
              target,
              [target, o],
              // 'root' is the item from the iteration.
              copts.update(o, { variables })
            );
            break;
        }
      }
    } else {
      switch (expr.whenNotMatched) {
        case "discard":
          break;
        case "fail":
          throw new import_util.MingoError(
            "$merge: failed due to matching as specified by 'whenMatched' option."
          );
        case "insert":
        default:
          output.push(o);
          break;
      }
    }
    return o;
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $merge
});
