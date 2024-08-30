import { assert, isFunction, truthy } from "../../../util";
function $where(_, rhs, options) {
  assert(
    options.scriptEnabled,
    "$where operator requires 'scriptEnabled' option to be true"
  );
  const f = rhs;
  assert(isFunction(f), "$where only accepts a Function object");
  return (obj) => truthy(f.call(obj), options?.useStrictMode);
}
export {
  $where
};
