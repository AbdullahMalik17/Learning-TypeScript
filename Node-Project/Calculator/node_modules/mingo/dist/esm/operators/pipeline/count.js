import { Lazy } from "../../lazy";
import { assert, isString } from "../../util";
const $count = (collection, expr, _) => {
  assert(
    isString(expr) && expr.trim() !== "" && expr.indexOf(".") === -1 && expr.trim()[0] !== "$",
    "Invalid expression value for $count"
  );
  return Lazy([
    {
      [expr]: collection.size()
    }
  ]);
};
export {
  $count
};
