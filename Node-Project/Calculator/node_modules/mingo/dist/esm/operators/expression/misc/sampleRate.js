import { computeValue } from "../../../core";
const $sampleRate = (obj, expr, options) => Math.random() <= computeValue(obj, expr, null, options);
export {
  $sampleRate
};
