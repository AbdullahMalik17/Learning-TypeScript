import { trimString } from "./_internal";
const $ltrim = (obj, expr, options) => {
  return trimString(obj, expr, options, { left: true, right: false });
};
export {
  $ltrim
};
