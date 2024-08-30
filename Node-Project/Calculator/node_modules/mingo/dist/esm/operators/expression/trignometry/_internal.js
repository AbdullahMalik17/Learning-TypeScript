import { computeValue } from "../../../core";
import { MingoError } from "../../../util";
const FIXED_POINTS = {
  undefined: null,
  null: null,
  NaN: NaN,
  Infinity: new Error(),
  "-Infinity": new Error()
};
function createTrignometryOperator(f, fixedPoints = FIXED_POINTS) {
  const fp = Object.assign({}, FIXED_POINTS, fixedPoints);
  const keySet = new Set(Object.keys(fp));
  return (obj, expr, options) => {
    const n = computeValue(obj, expr, null, options);
    if (keySet.has(`${n}`)) {
      const res = fp[`${n}`];
      if (res instanceof Error) {
        throw new MingoError(
          `cannot apply $${f.name} to -inf, value must in (-inf,inf)`
        );
      }
      return res;
    }
    return f(n);
  };
}
export {
  createTrignometryOperator
};
