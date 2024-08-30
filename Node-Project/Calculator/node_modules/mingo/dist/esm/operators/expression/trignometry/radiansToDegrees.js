import { createTrignometryOperator } from "./_internal";
const DEGREES_FACTOR = 180 / Math.PI;
const $radiansToDegrees = createTrignometryOperator(
  (n) => n * DEGREES_FACTOR,
  {
    Infinity: Infinity,
    "-Infinity": -Infinity
  }
);
export {
  $radiansToDegrees
};
