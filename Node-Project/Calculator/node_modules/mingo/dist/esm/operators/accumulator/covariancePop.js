import { covariance } from "./_internal";
import { $push } from "./push";
const $covariancePop = (collection, expr, options) => covariance($push(collection, expr, options), false);
export {
  $covariancePop
};
