import { covariance } from "./_internal";
import { $push } from "./push";
const $covarianceSamp = (collection, expr, options) => covariance($push(collection, expr, options), true);
export {
  $covarianceSamp
};
