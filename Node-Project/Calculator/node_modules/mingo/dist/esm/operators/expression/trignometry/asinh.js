import { createTrignometryOperator } from "./_internal";
const $asinh = createTrignometryOperator(Math.asinh, {
  Infinity: Infinity,
  "-Infinity": -Infinity
});
export {
  $asinh
};
