import { bitwise } from "./_internal";
const $bitXor = bitwise(
  "$bitXor",
  (nums) => nums.reduce((a, b) => a ^ b, 0)
);
export {
  $bitXor
};
