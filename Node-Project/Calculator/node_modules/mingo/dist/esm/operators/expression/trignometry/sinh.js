import { createTrignometryOperator } from "./_internal";
const $sinh = createTrignometryOperator(Math.sinh, {
  "-Infinity": -Infinity,
  Infinity: Infinity
});
export {
  $sinh
};
