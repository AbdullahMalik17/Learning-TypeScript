import { trimString } from "./_internal";
const $trim = (obj, expr, options) => {
  return trimString(obj, expr, options, { left: true, right: true });
};
export {
  $trim
};
