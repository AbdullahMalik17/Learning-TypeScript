var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var predicates_exports = {};
__export(predicates_exports, {
  $all: () => $all,
  $elemMatch: () => $elemMatch,
  $eq: () => $eq,
  $exists: () => $exists,
  $gt: () => $gt,
  $gte: () => $gte,
  $in: () => $in,
  $lt: () => $lt,
  $lte: () => $lte,
  $mod: () => $mod,
  $ne: () => $ne,
  $nin: () => $nin,
  $regex: () => $regex,
  $size: () => $size,
  $type: () => $type,
  createExpressionOperator: () => createExpressionOperator,
  createQueryOperator: () => createQueryOperator
});
module.exports = __toCommonJS(predicates_exports);
var import_core = require("../core");
var import_query = require("../query");
var import_util = require("../util");
function createQueryOperator(predicate) {
  const f = (selector, value, options) => {
    const opts = { unwrapArray: true };
    const depth = Math.max(1, selector.split(".").length - 1);
    return (obj) => {
      const lhs = (0, import_util.resolve)(obj, selector, opts);
      return predicate(lhs, value, { ...options, depth });
    };
  };
  f.op = "query";
  return f;
}
function createExpressionOperator(predicate) {
  return (obj, expr, options) => {
    const args = (0, import_core.computeValue)(obj, expr, null, options);
    return predicate(...args);
  };
}
function $eq(a, b, options) {
  if ((0, import_util.isEqual)(a, b))
    return true;
  if ((0, import_util.isNil)(a) && (0, import_util.isNil)(b))
    return true;
  if (a instanceof Array) {
    const eq = import_util.isEqual.bind(null, b);
    return a.some(eq) || (0, import_util.flatten)(a, options?.depth).some(eq);
  }
  return false;
}
function $ne(a, b, options) {
  return !$eq(a, b, options);
}
function $in(a, b, options) {
  if ((0, import_util.isNil)(a))
    return b.some((v) => v === null);
  return (0, import_util.intersection)([(0, import_util.ensureArray)(a), b], options?.hashFunction).length > 0;
}
function $nin(a, b, options) {
  return !$in(a, b, options);
}
function $lt(a, b, _options) {
  return compare(a, b, (x, y) => (0, import_util.compare)(x, y) < 0);
}
function $lte(a, b, _options) {
  return compare(a, b, (x, y) => (0, import_util.compare)(x, y) <= 0);
}
function $gt(a, b, _options) {
  return compare(a, b, (x, y) => (0, import_util.compare)(x, y) > 0);
}
function $gte(a, b, _options) {
  return compare(a, b, (x, y) => (0, import_util.compare)(x, y) >= 0);
}
function $mod(a, b, _options) {
  return (0, import_util.ensureArray)(a).some(
    (x) => b.length === 2 && x % b[0] === b[1]
  );
}
function $regex(a, b, options) {
  const lhs = (0, import_util.ensureArray)(a);
  const match = (x) => (0, import_util.isString)(x) && (0, import_util.truthy)(b.exec(x), options?.useStrictMode);
  return lhs.some(match) || (0, import_util.flatten)(lhs, 1).some(match);
}
function $exists(a, b, _options) {
  return (b === false || b === 0) && a === void 0 || (b === true || b === 1) && a !== void 0;
}
function $all(values, queries, options) {
  if (!(0, import_util.isArray)(values) || !(0, import_util.isArray)(queries) || !values.length || !queries.length) {
    return false;
  }
  let matched = true;
  for (const query of queries) {
    if (!matched)
      break;
    if ((0, import_util.isObject)(query) && (0, import_util.inArray)(Object.keys(query), "$elemMatch")) {
      matched = $elemMatch(values, query["$elemMatch"], options);
    } else if (query instanceof RegExp) {
      matched = values.some((s) => typeof s === "string" && query.test(s));
    } else {
      matched = values.some((v) => (0, import_util.isEqual)(query, v));
    }
  }
  return matched;
}
function $size(a, b, _options) {
  return Array.isArray(a) && a.length === b;
}
function isNonBooleanOperator(name) {
  return (0, import_util.isOperator)(name) && ["$and", "$or", "$nor"].indexOf(name) === -1;
}
function $elemMatch(a, b, options) {
  if ((0, import_util.isArray)(a) && !(0, import_util.isEmpty)(a)) {
    let format = (x) => x;
    let criteria = b;
    if (Object.keys(b).every(isNonBooleanOperator)) {
      criteria = { temp: b };
      format = (x) => ({ temp: x });
    }
    const query = new import_query.Query(criteria, options);
    for (let i = 0, len = a.length; i < len; i++) {
      if (query.test(format(a[i]))) {
        return true;
      }
    }
  }
  return false;
}
const isNull = (a) => a === null;
const isInt = (a) => (0, import_util.isNumber)(a) && a >= import_util.MIN_INT && a <= import_util.MAX_INT && a.toString().indexOf(".") === -1;
const isLong = (a) => (0, import_util.isNumber)(a) && a >= import_util.MIN_LONG && a <= import_util.MAX_LONG && a.toString().indexOf(".") === -1;
const compareFuncs = {
  array: import_util.isArray,
  bool: import_util.isBoolean,
  boolean: import_util.isBoolean,
  date: import_util.isDate,
  decimal: import_util.isNumber,
  double: import_util.isNumber,
  int: isInt,
  long: isLong,
  number: import_util.isNumber,
  null: isNull,
  object: import_util.isObject,
  regex: import_util.isRegExp,
  regexp: import_util.isRegExp,
  string: import_util.isString,
  // added for completeness
  undefined: import_util.isNil,
  // deprecated
  function: (_) => {
    throw new import_util.MingoError("unsupported type key `function`.");
  },
  // Mongo identifiers
  1: import_util.isNumber,
  //double
  2: import_util.isString,
  3: import_util.isObject,
  4: import_util.isArray,
  6: import_util.isNil,
  // deprecated
  8: import_util.isBoolean,
  9: import_util.isDate,
  10: isNull,
  11: import_util.isRegExp,
  16: isInt,
  18: isLong,
  19: import_util.isNumber
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
  return (0, import_util.ensureArray)(a).some((x) => (0, import_util.getType)(x) === (0, import_util.getType)(b) && f(x, b));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
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
});
