import { bitwise } from "./_internal";
const $bitAnd = bitwise(
  "$bitAnd",
  (nums) => nums.reduce((a, b) => a & b, -1)
);
export {
  $bitAnd
};
