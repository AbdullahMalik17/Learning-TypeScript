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
var unwind_exports = {};
__export(unwind_exports, {
  $unwind: () => $unwind
});
module.exports = __toCommonJS(unwind_exports);
var import_lazy = require("../../lazy");
var import_util = require("../../util");
const $unwind = (collection, expr, _options) => {
  if ((0, import_util.isString)(expr))
    expr = { path: expr };
  const path = expr.path;
  const field = path.substring(1);
  const includeArrayIndex = expr?.includeArrayIndex || false;
  const preserveNullAndEmptyArrays = expr.preserveNullAndEmptyArrays || false;
  const format = (o, i) => {
    if (includeArrayIndex !== false)
      o[includeArrayIndex] = i;
    return o;
  };
  let value;
  return (0, import_lazy.Lazy)(() => {
    for (; ; ) {
      if (value instanceof import_lazy.Iterator) {
        const tmp = value.next();
        if (!tmp.done)
          return tmp;
      }
      const wrapper = collection.next();
      if (wrapper.done)
        return wrapper;
      const obj = wrapper.value;
      value = (0, import_util.resolve)(obj, field);
      if (value instanceof Array) {
        if (value.length === 0 && preserveNullAndEmptyArrays === true) {
          value = null;
          (0, import_util.removeValue)(obj, field);
          return { value: format(obj, null), done: false };
        } else {
          value = (0, import_lazy.Lazy)(value).map((item, i) => {
            const newObj = (0, import_util.resolveGraph)(obj, field, {
              preserveKeys: true
            });
            (0, import_util.setValue)(newObj, field, item);
            return format(newObj, i);
          });
        }
      } else if (!(0, import_util.isEmpty)(value) || preserveNullAndEmptyArrays === true) {
        return { value: format(obj, null), done: false };
      }
    }
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $unwind
});
