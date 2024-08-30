import { isNumber } from "../../util";
import { $push } from "../accumulator";
import { withMemo } from "./_internal";
const interpolate = (x1, y1, x2, y2, x) => y1 + (x - x1) * ((y2 - y1) / (x2 - x1));
function $linearFill(_, collection, expr, options) {
  return withMemo(
    collection,
    expr,
    () => {
      const sortKey = "$" + Object.keys(expr.parentExpr.sortBy)[0];
      const points = $push(
        collection,
        [sortKey, expr.inputExpr],
        options
      ).filter(([x, _2]) => isNumber(+x));
      if (points.length !== collection.length)
        return null;
      let lindex = -1;
      let rindex = 0;
      while (rindex < points.length) {
        while (lindex + 1 < points.length && isNumber(points[lindex + 1][1])) {
          lindex++;
          rindex = lindex;
        }
        while (rindex + 1 < points.length && !isNumber(points[rindex + 1][1])) {
          rindex++;
        }
        if (rindex + 1 >= points.length)
          break;
        rindex++;
        while (lindex + 1 < rindex) {
          points[lindex + 1][1] = interpolate(
            points[lindex][0],
            points[lindex][1],
            points[rindex][0],
            points[rindex][1],
            points[lindex + 1][0]
          );
          lindex++;
        }
        lindex = rindex;
      }
      return points.map(([_2, y]) => y);
    },
    (values) => values[expr.documentNumber - 1]
  );
}
export {
  $linearFill
};
