import { trimString } from "./_internal";
const $rtrim = (obj, expr, options) => {
  return trimString(obj, expr, options, { left: false, right: true });
};
export {
  $rtrim
};
