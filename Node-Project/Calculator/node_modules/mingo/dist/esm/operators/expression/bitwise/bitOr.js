import { bitwise } from "./_internal";
const $bitOr = bitwise(
  "$bitOr",
  (nums) => nums.reduce((a, b) => a | b, 0)
);
export {
  $bitOr
};
