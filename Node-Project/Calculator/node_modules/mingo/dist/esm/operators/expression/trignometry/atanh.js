import { createTrignometryOperator } from "./_internal";
const $atanh = createTrignometryOperator(Math.atanh, {
  1: Infinity,
  "-1": -Infinity
});
export {
  $atanh
};
