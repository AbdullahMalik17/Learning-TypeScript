import { assert, findInsertIndex, isNumber } from "../../util";
import { $push } from "./push";
const $percentile = (collection, expr, options) => {
  const X = $push(collection, expr.input, options).filter(isNumber).sort();
  const centiles = $push(expr.p, "$$CURRENT", options).filter(isNumber);
  const method = expr.method || "approximate";
  return centiles.map((p) => {
    assert(
      p > 0 && p <= 1,
      `percentile value must be between 0 (exclusive) and 1 (inclusive): invalid '${p}'.`
    );
    const r = p * (X.length - 1) + 1;
    const ri = Math.floor(r);
    const result = r === ri ? X[r - 1] : X[ri - 1] + r % 1 * (X[ri] - X[ri - 1] || 0);
    switch (method) {
      case "exact":
        return result;
      case "approximate": {
        const i = findInsertIndex(X, result);
        return i / X.length >= p ? X[Math.max(i - 1, 0)] : X[i];
      }
    }
  });
};
export {
  $percentile
};
