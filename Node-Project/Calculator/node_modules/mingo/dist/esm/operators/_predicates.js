import {
  computeValue
} from "../core";
import { Query } from "../query";
import {
  compare as mingoCmp,
  ensureArray,
  flatten,
  getType,
  inArray,
  intersection,
  isArray,
  isBoolean,
  isDate,
  isEmpty,
  isEqual,
  isNil,
  isNumber,
  isObject,
  isOperator,
  isRegExp,
  isString,
  MAX_INT,
  MAX_LONG,
  MIN_INT,
  MIN_LONG,
  MingoError,
  resolve,
  truthy
} from "../util";
function createQueryOperator(predicate) {
  const f = (selector, value, options) => {
    const opts = { unwrapArray: true };
    const depth = Math.max(1, selector.split(".").length - 1);
    return (obj) => {
      const lhs = resolve(obj, selector, opts);
      return predicate(lhs, value, { ...options, depth });
    };
  };
  f.op = "query";
  return f;
}
function createExpressionOperator(predicate) {
  return (obj, expr, options) => {
    const args = computeValue(obj, expr, null, options);
    return predicate(...args);
  };
}
function $eq(a, b, options) {
  if (isEqual(a, b))
    return true;
  if (isNil(a) && isNil(b))
    return true;
  if (a instanceof Array) {
    const eq = isEqual.bind(null, b);
    return a.some(eq) || flatten(a, options?.depth).some(eq);
  }
  return false;
}
function $ne(a, b, options) {
  return !$eq(a, b, options);
}
function $in(a, b, options) {
  if (isNil(a))
    return b.some((v) => v === null);
  return intersection([ensureArray(a), b], options?.hashFunction).length > 0;
}
function $nin(a, b, options) {
  return !$in(a, b, options);
}
function $lt(a, b, _options) {
  return compare(a, b, (x, y) => mingoCmp(x, y) < 0);
}
function $lte(a, b, _options) {
  return compare(a, b, (x, y) => mingoCmp(x, y) <= 0);
}
function $gt(a, b, _options) {
  return compare(a, b, (x, y) => mingoCmp(x, y) > 0);
}
function $gte(a, b, _options) {
  return compare(a, b, (x, y) => mingoCmp(x, y) >= 0);
}
function $mod(a, b, _options) {
  return ensureArray(a).some(
    (x) => b.length === 2 && x % b[0] === b[1]
  );
}
function $regex(a, b, options) {
  const lhs = ensureArray(a);
  const match = (x) => isString(x) && truthy(b.exec(x), options?.useStrictMode);
  return lhs.some(match) || flatten(lhs, 1).some(match);
}
function $exists(a, b, _options) {
  return (b === false || b === 0) && a === void 0 || (b === true || b === 1) && a !== void 0;
}
function $all(values, queries, options) {
  if (!isArray(values) || !isArray(queries) || !values.length || !queries.length) {
    return false;
  }
  let matched = true;
  for (const query of queries) {
    if (!matched)
      break;
    if (isObject(query) && inArray(Object.keys(query), "$elemMatch")) {
      matched = $elemMatch(values, query["$elemMatch"], options);
    } else if (query instanceof RegExp) {
      matched = values.some((s) => typeof s === "string" && query.test(s));
    } else {
      matched = values.some((v) => isEqual(query, v));
    }
  }
  return matched;
}
function $size(a, b, _options) {
  return Array.isArray(a) && a.length === b;
}
function isNonBooleanOperator(name) {
  return isOperator(name) && ["$and", "$or", "$nor"].indexOf(name) === -1;
}
function $elemMatch(a, b, options) {
  if (isArray(a) && !isEmpty(a)) {
    let format = (x) => x;
    let criteria = b;
    if (Object.keys(b).every(isNonBooleanOperator)) {
      criteria = { temp: b };
      format = (x) => ({ temp: x });
    }
    const query = new Query(criteria, options);
    for (let i = 0, len = a.length; i < len; i++) {
      if (query.test(format(a[i]))) {
        return true;
      }
    }
  }
  return false;
}
const isNull = (a) => a === null;
const isInt = (a) => isNumber(a) && a >= MIN_INT && a <= MAX_INT && a.toString().indexOf(".") === -1;
const isLong = (a) => isNumber(a) && a >= MIN_LONG && a <= MAX_LONG && a.toString().indexOf(".") === -1;
const compareFuncs = {
  array: isArray,
  bool: isBoolean,
  boolean: isBoolean,
  date: isDate,
  decimal: isNumber,
  double: isNumber,
  int: isInt,
  long: isLong,
  number: isNumber,
  null: isNull,
  object: isObject,
  regex: isRegExp,
  regexp: isRegExp,
  string: isString,
  // added for completeness
  undefined: isNil,
  // deprecated
  function: (_) => {
    throw new MingoError("unsupported type key `function`.");
  },
  // Mongo identifiers
  1: isNumber,
  //double
  2: isString,
  3: isObject,
  4: isArray,
  6: isNil,
  // deprecated
  8: isBoolean,
  9: isDate,
  10: isNull,
  11: isRegExp,
  16: isInt,
  18: isLong,
  19: isNumber
  //decimal
};
function compareType(a, b, _) {
  const f = compareFuncs[b];
  return f ? f(a) : false;
}
function $type(a, b, options) {
  return Array.isArray(b) ? b.findIndex((t) => compareType(a, t, options)) >= 0 : compareType(a, b, options);
}
function compare(a, b, f) {
  return ensureArray(a).some((x) => getType(x) === getType(b) && f(x, b));
}
export {
  $all,
  $elemMatch,
  $eq,
  $exists,
  $gt,
  $gte,
  $in,
  $lt,
  $lte,
  $mod,
  $ne,
  $nin,
  $regex,
  $size,
  $type,
  createExpressionOperator,
  createQueryOperator
};
