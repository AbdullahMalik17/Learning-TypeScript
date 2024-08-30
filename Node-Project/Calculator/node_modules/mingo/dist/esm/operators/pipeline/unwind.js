import { Iterator, Lazy } from "../../lazy";
import {
  isEmpty,
  isString,
  removeValue,
  resolve,
  resolveGraph,
  setValue
} from "../../util";
const $unwind = (collection, expr, _options) => {
  if (isString(expr))
    expr = { path: expr };
  const path = expr.path;
  const field = path.substring(1);
  const includeArrayIndex = expr?.includeArrayIndex || false;
  const preserveNullAndEmptyArrays = expr.preserveNullAndEmptyArrays || false;
  const format = (o, i) => {
    if (includeArrayIndex !== false)
      o[includeArrayIndex] = i;
    return o;
  };
  let value;
  return Lazy(() => {
    for (; ; ) {
      if (value instanceof Iterator) {
        const tmp = value.next();
        if (!tmp.done)
          return tmp;
      }
      const wrapper = collection.next();
      if (wrapper.done)
        return wrapper;
      const obj = wrapper.value;
      value = resolve(obj, field);
      if (value instanceof Array) {
        if (value.length === 0 && preserveNullAndEmptyArrays === true) {
          value = null;
          removeValue(obj, field);
          return { value: format(obj, null), done: false };
        } else {
          value = Lazy(value).map((item, i) => {
            const newObj = resolveGraph(obj, field, {
              preserveKeys: true
            });
            setValue(newObj, field, item);
            return format(newObj, i);
          });
        }
      } else if (!isEmpty(value) || preserveNullAndEmptyArrays === true) {
        return { value: format(obj, null), done: false };
      }
    }
  });
};
export {
  $unwind
};
