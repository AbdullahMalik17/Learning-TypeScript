import {
  ComputeOptions,
  computeValue
} from "../../core";
import { assert, groupBy, has } from "../../util";
const ID_KEY = "_id";
const $group = (collection, expr, options) => {
  assert(has(expr, ID_KEY), "a group specification must include an _id");
  const idExpr = expr[ID_KEY];
  const copts = ComputeOptions.init(options);
  return collection.transform((coll) => {
    const partitions = groupBy(
      coll,
      (obj) => computeValue(obj, idExpr, null, options),
      options.hashFunction
    );
    expr = { ...expr };
    delete expr[ID_KEY];
    let i = -1;
    const partitionKeys = Array.from(partitions.keys());
    const size = partitions.size;
    return () => {
      if (++i === size)
        return { done: true };
      const groupId = partitionKeys[i];
      const obj = {};
      if (groupId !== void 0) {
        obj[ID_KEY] = groupId;
      }
      for (const [key, val] of Object.entries(expr)) {
        obj[key] = computeValue(
          partitions.get(groupId),
          val,
          key,
          copts.update(null, { groupId })
        );
      }
      return { value: obj, done: false };
    };
  });
};
export {
  $group
};
