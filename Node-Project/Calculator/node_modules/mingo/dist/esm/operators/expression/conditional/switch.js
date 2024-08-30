import { computeValue } from "../../../core";
import { truthy } from "../../../util";
const $switch = (obj, expr, options) => {
  let thenExpr = null;
  expr.branches.some((b) => {
    const condition = truthy(
      computeValue(obj, b.case, null, options),
      options.useStrictMode
    );
    if (condition)
      thenExpr = b.then;
    return condition;
  });
  return computeValue(
    obj,
    thenExpr !== null ? thenExpr : expr.default,
    null,
    options
  );
};
export {
  $switch
};
