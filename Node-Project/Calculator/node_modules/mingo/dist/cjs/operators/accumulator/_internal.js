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
  covariance: () => covariance,
  stddev: () => stddev
});
module.exports = __toCommonJS(internal_exports);
function stddev(data, sampled = true) {
  const sum = data.reduce((acc, n) => acc + n, 0);
  const N = data.length || 1;
  const avg = sum / N;
  return Math.sqrt(
    data.reduce((acc, n) => acc + Math.pow(n - avg, 2), 0) / (N - Number(sampled))
  );
}
function covariance(dataset, sampled = true) {
  if (!dataset)
    return null;
  if (dataset.length < 2)
    return sampled ? null : 0;
  let meanX = 0;
  let meanY = 0;
  for (const [x, y] of dataset) {
    meanX += x;
    meanY += y;
  }
  meanX /= dataset.length;
  meanY /= dataset.length;
  let result = 0;
  for (const [x, y] of dataset) {
    result += (x - meanX) * (y - meanY);
  }
  return result / (dataset.length - Number(sampled));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  covariance,
  stddev
});
