import { regexSearch } from "./_internal";
const $regexFindAll = (obj, expr, options) => {
  return regexSearch(obj, expr, options, { global: true });
};
export {
  $regexFindAll
};
