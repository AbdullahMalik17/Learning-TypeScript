import { groupBy, isEqual, MingoError } from "../../util";
import { $push } from "../accumulator";
import { MILLIS_PER_DAY } from "../expression/date/_internal";
import { isUnbounded } from "../pipeline/_internal";
const MILLIS_PER_UNIT = {
  week: MILLIS_PER_DAY * 7,
  day: MILLIS_PER_DAY,
  hour: MILLIS_PER_DAY / 24,
  minute: 6e4,
  second: 1e3,
  millisecond: 1
};
const memo = /* @__PURE__ */ new WeakMap();
function withMemo(collection, expr, cacheFn, fn) {
  if (!isUnbounded(expr.parentExpr.output[expr.field].window)) {
    return fn(cacheFn());
  }
  if (!memo.has(collection)) {
    memo.set(collection, { [expr.field]: cacheFn() });
  }
  const data = memo.get(collection);
  if (data[expr.field] === void 0) {
    data[expr.field] = cacheFn();
  }
  let failed = false;
  try {
    return fn(data[expr.field]);
  } catch (e) {
    failed = true;
  } finally {
    if (failed || expr.documentNumber === collection.length) {
      delete data[expr.field];
      if (Object.keys(data).length === 0)
        memo.delete(collection);
    }
  }
}
function rank(_, collection, expr, options, dense) {
  return withMemo(
    collection,
    expr,
    () => {
      const sortKey = "$" + Object.keys(expr.parentExpr.sortBy)[0];
      const values = $push(collection, sortKey, options);
      const groups = groupBy(
        values,
        (_2, n) => values[n],
        options.hashFunction
      );
      return { values, groups };
    },
    (input) => {
      const { values, groups: partitions } = input;
      if (partitions.size == collection.length) {
        return expr.documentNumber;
      }
      const current = values[expr.documentNumber - 1];
      let i = 0;
      let offset = 0;
      for (const key of partitions.keys()) {
        if (isEqual(current, key)) {
          return dense ? i + 1 : offset + 1;
        }
        i++;
        offset += partitions.get(key).length;
      }
      throw new MingoError(
        "rank: invalid return value. please submit a bug report."
      );
    }
  );
}
export {
  MILLIS_PER_UNIT,
  rank,
  withMemo
};
