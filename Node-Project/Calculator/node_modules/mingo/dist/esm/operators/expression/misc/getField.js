import { computeValue } from "../../../core";
import { assert, isNil, isObject, isString } from "../../../util";
const $getField = (obj, expr, options) => {
  const args = computeValue(obj, expr, null, options);
  const [field, input] = isObject(args) ? [args.field, args.input || obj] : [args, obj];
  if (isNil(input))
    return null;
  assert(
    isObject(input),
    "$getField expression 'input' must evaluate to an object"
  );
  assert(
    isString(field),
    "$getField expression 'field' must evaluate to a string"
  );
  return input[field];
};
export {
  $getField
};
