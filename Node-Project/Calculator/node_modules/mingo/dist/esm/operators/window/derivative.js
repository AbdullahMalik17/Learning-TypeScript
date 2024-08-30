import { isNumber } from "../../util";
import { $push } from "../accumulator";
import { MILLIS_PER_UNIT } from "./_internal";
function $derivative(_, collection, expr, options) {
  if (collection.length < 2)
    return null;
  const { input, unit } = expr.inputExpr;
  const sortKey = "$" + Object.keys(expr.parentExpr.sortBy)[0];
  const values = [collection[0], collection[collection.length - 1]];
  const points = $push(values, [sortKey, input], options).filter(
    ([x, y]) => isNumber(+x) && isNumber(+y)
  );
  if (points.length !== 2)
    return null;
  const [[x1, y1], [x2, y2]] = points;
  const deltaX = (x2 - x1) / (MILLIS_PER_UNIT[unit] || 1);
  return (y2 - y1) / deltaX;
}
export {
  $derivative
};
