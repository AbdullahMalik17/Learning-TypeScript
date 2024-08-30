import { unique } from "../../util";
import { $push } from "./push";
const $addToSet = (collection, expr, options) => {
  return unique(
    $push(collection, expr, options),
    options?.hashFunction
  );
};
export {
  $addToSet
};
