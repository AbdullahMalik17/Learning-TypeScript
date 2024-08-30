import { createTrignometryOperator } from "./_internal";
const $acos = createTrignometryOperator(Math.acos, {
  Infinity: Infinity,
  0: new Error()
});
export {
  $acos
};
