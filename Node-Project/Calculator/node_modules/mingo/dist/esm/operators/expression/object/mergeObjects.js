import { computeValue } from "../../../core";
import { into } from "../../../util";
const $mergeObjects = (obj, expr, options) => {
  const docs = computeValue(obj, expr, null, options);
  return docs instanceof Array ? docs.reduce((memo, o) => into(memo, o), {}) : {};
};
export {
  $mergeObjects
};
