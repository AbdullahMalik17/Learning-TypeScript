import { computeValue } from "../../../core";
const $range = (obj, expr, options) => {
  const arr = computeValue(obj, expr, null, options);
  const start = arr[0];
  const end = arr[1];
  const step = arr[2] || 1;
  const result = new Array();
  let counter = start;
  while (counter < end && step > 0 || counter > end && step < 0) {
    result.push(counter);
    counter += step;
  }
  return result;
};
export {
  $range
};
