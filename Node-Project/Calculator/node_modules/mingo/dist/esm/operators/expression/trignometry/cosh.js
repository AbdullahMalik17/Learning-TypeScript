import { createTrignometryOperator } from "./_internal";
const $cosh = createTrignometryOperator(Math.cosh, {
  "-Infinity": Infinity,
  Infinity: Infinity
  // [Math.PI]: -1,
});
export {
  $cosh
};
