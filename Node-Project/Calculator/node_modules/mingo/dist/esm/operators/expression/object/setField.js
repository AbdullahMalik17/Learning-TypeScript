import { computeValue } from "../../../core";
import { assert, isNil, isObject, isString } from "../../../util";
const $setField = (obj, expr, options) => {
  const args = computeValue(obj, expr, null, options);
  if (isNil(args.input))
    return null;
  assert(
    isObject(args.input),
    "$setField expression 'input' must evaluate to an object"
  );
  assert(
    isString(args.field),
    "$setField expression 'field' must evaluate to a string"
  );
  if (expr.value == "$$REMOVE") {
    delete obj[args.field];
  } else {
    obj[args.field] = args.value;
  }
  return obj;
};
export {
  $setField
};
