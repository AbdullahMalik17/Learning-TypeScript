import { createBitwiseOperator } from "./_internal";
const $bitsAllSet = createBitwiseOperator(
  (result, mask) => result == mask
);
export {
  $bitsAllSet
};
