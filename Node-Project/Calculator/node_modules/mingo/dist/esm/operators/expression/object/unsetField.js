import { $setField } from "./setField";
const $unsetField = (obj, expr, options) => {
  return $setField(
    obj,
    {
      ...expr,
      value: "$$REMOVE"
    },
    options
  );
};
export {
  $unsetField
};
