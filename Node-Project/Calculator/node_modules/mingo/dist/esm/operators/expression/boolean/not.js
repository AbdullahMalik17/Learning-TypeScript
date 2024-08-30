import { computeValue } from "../../../core";
import { ensureArray } from "../../../util";
const $not = (obj, expr, options) => {
  const booleanExpr = ensureArray(expr);
  if (booleanExpr.length == 0)
    return false;
  if (booleanExpr.length == 1)
    return !computeValue(obj, booleanExpr[0], null, options);
  throw "Expression $not takes exactly 1 argument";
};
export {
  $not
};
