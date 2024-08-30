import { computeValue } from "../../core";
import { removeValue, setValue } from "../../util";
const $addFields = (collection, expr, options) => {
  const newFields = Object.keys(expr);
  if (newFields.length === 0)
    return collection;
  return collection.map((obj) => {
    const newObj = { ...obj };
    for (const field of newFields) {
      const newValue = computeValue(obj, expr[field], null, options);
      if (newValue !== void 0) {
        setValue(newObj, field, newValue);
      } else {
        removeValue(newObj, field);
      }
    }
    return newObj;
  });
};
export {
  $addFields
};
