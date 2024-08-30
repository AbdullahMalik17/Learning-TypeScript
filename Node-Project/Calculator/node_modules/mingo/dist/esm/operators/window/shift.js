import { computeValue } from "../../core";
function $shift(obj, collection, expr, options) {
  const input = expr.inputExpr;
  const shiftedIndex = expr.documentNumber - 1 + input.by;
  if (shiftedIndex < 0 || shiftedIndex > collection.length - 1) {
    return input.default ? computeValue(obj, input.default, null, options) : null;
  }
  return computeValue(collection[shiftedIndex], input.output, null, options);
}
export {
  $shift
};
