import { computeValue } from "../../../core";
const $strLenBytes = (obj, expr, options) => {
  return ~-encodeURI(computeValue(obj, expr, null, options)).split(
    /%..|./
  ).length;
};
export {
  $strLenBytes
};
