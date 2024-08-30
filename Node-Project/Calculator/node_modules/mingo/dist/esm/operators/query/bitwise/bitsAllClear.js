import { createBitwiseOperator } from "./_internal";
const $bitsAllClear = createBitwiseOperator((result, _) => result == 0);
export {
  $bitsAllClear
};
