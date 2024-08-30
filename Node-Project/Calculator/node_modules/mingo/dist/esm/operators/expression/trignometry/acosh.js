import { createTrignometryOperator } from "./_internal";
const $acosh = createTrignometryOperator(Math.acosh, {
  Infinity: Infinity,
  0: new Error()
});
export {
  $acosh
};
