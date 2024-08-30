import { isArray, resolve } from "../../util";
import { $slice as __slice } from "../expression/array/slice";
const $slice = (obj, expr, field, options) => {
  const xs = resolve(obj, field);
  const exprAsArray = expr;
  if (!isArray(xs))
    return xs;
  return __slice(
    obj,
    expr instanceof Array ? [xs, ...exprAsArray] : [xs, expr],
    options
  );
};
export {
  $slice
};
