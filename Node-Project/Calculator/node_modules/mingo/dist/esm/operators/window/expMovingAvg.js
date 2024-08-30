import { assert, isNumber } from "../../util";
import { $push } from "../accumulator";
import { withMemo } from "./_internal";
function $expMovingAvg(_, collection, expr, options) {
  const { input, N, alpha } = expr.inputExpr;
  assert(
    !(N && alpha),
    `You must specify either N or alpha. You cannot specify both.`
  );
  return withMemo(
    collection,
    expr,
    () => {
      const series = $push(collection, input, options).filter(isNumber);
      return series.length === collection.length ? series : null;
    },
    (series) => {
      if (series === null)
        return null;
      if (expr.documentNumber == 1)
        return series[0];
      const weight = N != void 0 ? 2 / (N + 1) : alpha;
      const i = expr.documentNumber - 1;
      series[i] = series[i] * weight + series[i - 1] * (1 - weight);
      return series[i];
    }
  );
}
export {
  $expMovingAvg
};
