import { createTrignometryOperator } from "./_internal";
const RADIANS_FACTOR = Math.PI / 180;
const $degreesToRadians = createTrignometryOperator(
  (n) => n * RADIANS_FACTOR,
  {
    Infinity: Infinity,
    "-Infinity": Infinity
  }
);
export {
  $degreesToRadians
};
