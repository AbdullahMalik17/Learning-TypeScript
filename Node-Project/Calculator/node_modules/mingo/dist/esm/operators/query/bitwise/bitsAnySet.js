import { createBitwiseOperator } from "./_internal";
const $bitsAnySet = createBitwiseOperator((result, _) => result > 0);
export {
  $bitsAnySet
};
