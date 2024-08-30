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
var sample_exports = {};
__export(sample_exports, {
  $sample: () => $sample
});
module.exports = __toCommonJS(sample_exports);
const $sample = (collection, expr, _options) => {
  return collection.transform((xs) => {
    const len = xs.length;
    let i = -1;
    return () => {
      if (++i === expr.size)
        return { done: true };
      const n = Math.floor(Math.random() * len);
      return { value: xs[n], done: false };
    };
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $sample
});
