import { regexSearch } from "./_internal";
const $regexMatch = (obj, expr, options) => {
  return regexSearch(obj, expr, options, { global: false }).length != 0;
};
export {
  $regexMatch
};
