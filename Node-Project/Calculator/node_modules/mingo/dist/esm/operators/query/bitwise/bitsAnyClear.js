import { createBitwiseOperator } from "./_internal";
const $bitsAnyClear = createBitwiseOperator(
  (result, mask) => result < mask
);
export {
  $bitsAnyClear
};
