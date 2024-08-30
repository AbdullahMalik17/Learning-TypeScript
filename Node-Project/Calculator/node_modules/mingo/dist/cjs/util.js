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
var util_exports = {};
__export(util_exports, {
  MAX_INT: () => MAX_INT,
  MAX_LONG: () => MAX_LONG,
  MIN_INT: () => MIN_INT,
  MIN_LONG: () => MIN_LONG,
  MingoError: () => MingoError,
  assert: () => assert,
  cloneDeep: () => cloneDeep,
  compare: () => compare,
  ensureArray: () => ensureArray,
  filterMissing: () => filterMissing,
  findInsertIndex: () => findInsertIndex,
  flatten: () => flatten,
  getType: () => getType,
  groupBy: () => groupBy,
  has: () => has,
  hashCode: () => hashCode,
  inArray: () => inArray,
  intersection: () => intersection,
  into: () => into,
  isArray: () => isArray,
  isBigInt: () => isBigInt,
  isBoolean: () => isBoolean,
  isDate: () => isDate,
  isEmpty: () => isEmpty,
  isEqual: () => isEqual,
  isFunction: () => isFunction,
  isMissing: () => isMissing,
  isNil: () => isNil,
  isNotNaN: () => isNotNaN,
  isNumber: () => isNumber,
  isObject: () => isObject,
  isObjectLike: () => isObjectLike,
  isOperator: () => isOperator,
  isRegExp: () => isRegExp,
  isString: () => isString,
  isSymbol: () => isSymbol,
  memoize: () => memoize,
  merge: () => merge,
  normalize: () => normalize,
  notInArray: () => notInArray,
  removeValue: () => removeValue,
  resolve: () => resolve,
  resolveGraph: () => resolveGraph,
  setValue: () => setValue,
  sortBy: () => sortBy,
  stringify: () => stringify,
  truthy: () => truthy,
  unique: () => unique,
  walk: () => walk
});
module.exports = __toCommonJS(util_exports);
class MingoError extends Error {
}
const MAX_INT = 2147483647;
const MIN_INT = -2147483648;
const MAX_LONG = Number.MAX_SAFE_INTEGER;
const MIN_LONG = Number.MIN_SAFE_INTEGER;
const MISSING = Symbol("missing");
const CYCLE_FOUND_ERROR = Object.freeze(
  new Error("mingo: cycle detected while processing object/array")
);
const OBJECT_TAG = "[object Object]";
const OBJECT_TYPE_RE = /^\[object ([a-zA-Z0-9]+)\]$/;
const DEFAULT_HASH_FUNCTION = (value) => {
  const s = stringify(value);
  let hash = 0;
  let i = s.length;
  while (i)
    hash = (hash << 5) - hash ^ s.charCodeAt(--i);
  return hash >>> 0;
};
const JS_SIMPLE_TYPES = /* @__PURE__ */ new Set([
  "null",
  "undefined",
  "boolean",
  "number",
  "string",
  "date",
  "regexp"
]);
const SORT_ORDER_BY_TYPE = {
  null: 0,
  undefined: 0,
  number: 1,
  string: 2,
  object: 3,
  array: 4,
  boolean: 5,
  date: 6,
  regexp: 7,
  function: 8
};
const compare = (a, b) => {
  if (a === MISSING)
    a = void 0;
  if (b === MISSING)
    b = void 0;
  const [u, v] = [a, b].map(
    (n) => SORT_ORDER_BY_TYPE[getType(n).toLowerCase()]
  );
  if (u !== v)
    return u - v;
  if (u === 1 || u === 2 || u === 6) {
    if (a < b)
      return -1;
    if (a > b)
      return 1;
    return 0;
  }
  if (isEqual(a, b))
    return 0;
  if (a < b)
    return -1;
  if (a > b)
    return 1;
  return 0;
};
function assert(condition, message) {
  if (!condition)
    throw new MingoError(message);
}
const getType = (v) => OBJECT_TYPE_RE.exec(Object.prototype.toString.call(v))[1];
const isBoolean = (v) => typeof v === "boolean";
const isString = (v) => typeof v === "string";
const isSymbol = (v) => typeof v === "symbol";
const isNumber = (v) => !isNaN(v) && typeof v === "number";
const isBigInt = (v) => !isNaN(v) && typeof v === "bigint";
const isNotNaN = (v) => !(isNaN(v) && typeof v === "number");
const isArray = Array.isArray;
const isObject = (v) => {
  if (!v)
    return false;
  const proto = Object.getPrototypeOf(v);
  return (proto === Object.prototype || proto === null) && OBJECT_TAG === Object.prototype.toString.call(v);
};
const isObjectLike = (v) => v === Object(v);
const isDate = (v) => v instanceof Date;
const isRegExp = (v) => v instanceof RegExp;
const isFunction = (v) => typeof v === "function";
const isNil = (v) => v === null || v === void 0;
const inArray = (arr, item) => arr.includes(item);
const notInArray = (arr, item) => !inArray(arr, item);
const truthy = (arg, strict = true) => !!arg || strict && arg === "";
const isEmpty = (x) => isNil(x) || isString(x) && !x || x instanceof Array && x.length === 0 || isObject(x) && Object.keys(x).length === 0;
const isMissing = (v) => v === MISSING;
const ensureArray = (x) => x instanceof Array ? x : [x];
const has = (obj, prop) => !!obj && Object.prototype.hasOwnProperty.call(obj, prop);
const isTypedArray = (v) => typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView(v);
const INSTANCE_CLONE = [isDate, isRegExp, isTypedArray];
const cloneInternal = (val, refs) => {
  if (isNil(val))
    return val;
  if (refs.has(val))
    throw CYCLE_FOUND_ERROR;
  const ctor = val.constructor;
  if (INSTANCE_CLONE.some((f) => f(val)))
    return new ctor(val);
  try {
    refs.add(val);
    if (isArray(val))
      return val.map((v) => cloneInternal(v, refs));
    if (isObject(val)) {
      const res = {};
      for (const k in val)
        res[k] = cloneInternal(val[k], refs);
      return res;
    }
  } finally {
    refs.delete(val);
  }
  return val;
};
const cloneDeep = (obj) => cloneInternal(obj, /* @__PURE__ */ new Set());
const mergeable = (left, right) => isObject(left) && isObject(right) || isArray(left) && isArray(right);
function merge(target, obj, options) {
  options = options || { flatten: false };
  if (isMissing(target) || isNil(target))
    return obj;
  if (isMissing(obj) || isNil(obj))
    return target;
  if (!mergeable(target, obj)) {
    if (options.skipValidation)
      return obj || target;
    throw Error("mismatched types. must both be array or object");
  }
  options.skipValidation = true;
  if (isArray(target)) {
    const result = target;
    const input = obj;
    if (options.flatten) {
      let i = 0;
      let j = 0;
      while (i < result.length && j < input.length) {
        result[i] = merge(result[i++], input[j++], options);
      }
      while (j < input.length) {
        result.push(obj[j++]);
      }
    } else {
      into(result, input);
    }
  } else {
    for (const k in obj) {
      target[k] = merge(
        target[k],
        obj[k],
        options
      );
    }
  }
  return target;
}
function buildHashIndex(arr, hashFunction = DEFAULT_HASH_FUNCTION) {
  const map = /* @__PURE__ */ new Map();
  arr.forEach((o, i) => {
    const h = hashCode(o, hashFunction);
    if (map.has(h)) {
      if (!map.get(h).some((j) => isEqual(arr[j], o))) {
        map.get(h).push(i);
      }
    } else {
      map.set(h, [i]);
    }
  });
  return map;
}
function intersection(input, hashFunction = DEFAULT_HASH_FUNCTION) {
  if (input.some((arr) => arr.length == 0))
    return [];
  if (input.length === 1)
    return Array.from(input);
  const sortedIndex = sortBy(
    input.map((a, i) => [i, a.length]),
    (a) => a[1]
  );
  const smallest = input[sortedIndex[0][0]];
  const map = buildHashIndex(smallest, hashFunction);
  const rmap = /* @__PURE__ */ new Map();
  const results = new Array();
  map.forEach((v, k) => {
    const lhs = v.map((j) => smallest[j]);
    const res = lhs.map((_) => 0);
    const stable = lhs.map((_) => [sortedIndex[0][0], 0]);
    let found = false;
    for (let i = 1; i < input.length; i++) {
      const [currIndex, _] = sortedIndex[i];
      const arr = input[currIndex];
      if (!rmap.has(i))
        rmap.set(i, buildHashIndex(arr));
      if (rmap.get(i).has(k)) {
        const rhs = rmap.get(i).get(k).map((j) => arr[j]);
        found = lhs.map(
          (s, n) => rhs.some((t, m) => {
            const p = res[n];
            if (isEqual(s, t)) {
              res[n]++;
              if (currIndex < stable[n][0]) {
                stable[n] = [currIndex, rmap.get(i).get(k)[m]];
              }
            }
            return p < res[n];
          })
        ).some(Boolean);
      }
      if (!found)
        return;
    }
    if (found) {
      into(
        results,
        res.map((n, i) => {
          return n === input.length - 1 ? [lhs[i], stable[i]] : MISSING;
        }).filter((n) => n !== MISSING)
      );
    }
  });
  return results.sort((a, b) => {
    const [_i, [u, m]] = a;
    const [_j, [v, n]] = b;
    const r = compare(u, v);
    if (r !== 0)
      return r;
    return compare(m, n);
  }).map((v) => v[0]);
}
function flatten(xs, depth = 0) {
  const arr = new Array();
  function flatten2(ys, n) {
    for (let i = 0, len = ys.length; i < len; i++) {
      if (isArray(ys[i]) && (n > 0 || n < 0)) {
        flatten2(ys[i], Math.max(-1, n - 1));
      } else {
        arr.push(ys[i]);
      }
    }
  }
  flatten2(xs, depth);
  return arr;
}
const getMembersOf = (value) => {
  let [proto, names] = [
    Object.getPrototypeOf(value),
    Object.getOwnPropertyNames(value)
  ];
  let activeProto = proto;
  while (!names.length && proto !== Object.prototype && proto !== Array.prototype) {
    activeProto = proto;
    names = Object.getOwnPropertyNames(proto);
    proto = Object.getPrototypeOf(proto);
  }
  const o = {};
  names.forEach((k) => o[k] = value[k]);
  return [o, activeProto];
};
function isEqual(a, b) {
  if (a === b || Object.is(a, b))
    return true;
  const ctor = !!a && a.constructor || a;
  if (a === null || b === null || a === void 0 || b === void 0 || ctor !== b.constructor || ctor === Function) {
    return false;
  }
  if (ctor === Array || ctor === Object) {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length)
      return false;
    if ((/* @__PURE__ */ new Set([...aKeys, ...bKeys])).size != aKeys.length)
      return false;
    for (const k of aKeys)
      if (!isEqual(a[k], b[k]))
        return false;
    return true;
  }
  const proto = Object.getPrototypeOf(a);
  const cmp = isTypedArray(a) || proto !== Object.prototype && proto !== Array.prototype && Object.prototype.hasOwnProperty.call(proto, "toString");
  return cmp && a.toString() === b.toString();
}
function unique(input, hashFunction = DEFAULT_HASH_FUNCTION) {
  const result = input.map((_) => MISSING);
  buildHashIndex(input, hashFunction).forEach((v, _) => {
    v.forEach((i) => result[i] = input[i]);
  });
  return result.filter((v) => v !== MISSING);
}
const toString = (v, cycle) => {
  if (v === null)
    return "null";
  if (v === void 0)
    return "undefined";
  const ctor = v.constructor;
  switch (ctor) {
    case RegExp:
    case Number:
    case Boolean:
    case Function:
    case Symbol:
      return v.toString();
    case String:
      return JSON.stringify(v);
    case Date:
      return v.toISOString();
  }
  if (isTypedArray(v))
    return ctor.name + "[" + v.toString() + "]";
  if (cycle.has(v))
    throw CYCLE_FOUND_ERROR;
  try {
    cycle.add(v);
    if (isArray(v)) {
      return "[" + v.map((s) => toString(s, cycle)).join(",") + "]";
    }
    if (ctor === Object) {
      return "{" + Object.keys(v).sort().map((k) => k + ":" + toString(v[k], cycle)).join(",") + "}";
    }
    const proto = Object.getPrototypeOf(v);
    if (proto !== Object.prototype && proto !== Array.prototype && Object.prototype.hasOwnProperty.call(proto, "toString")) {
      return ctor.name + "(" + JSON.stringify(v.toString()) + ")";
    }
    const [members, _] = getMembersOf(v);
    return ctor.name + toString(members, cycle);
  } finally {
    cycle.delete(v);
  }
};
const stringify = (value) => toString(value, /* @__PURE__ */ new Set());
function hashCode(value, hashFunction) {
  hashFunction = hashFunction || DEFAULT_HASH_FUNCTION;
  if (isNil(value))
    return null;
  return hashFunction(value).toString();
}
function sortBy(collection, keyFn, comparator = compare) {
  if (isEmpty(collection))
    return collection;
  const sorted = new Array();
  const result = new Array();
  for (let i = 0; i < collection.length; i++) {
    const obj = collection[i];
    const key = keyFn(obj, i);
    if (isNil(key)) {
      result.push(obj);
    } else {
      sorted.push([key, obj]);
    }
  }
  sorted.sort((a, b) => comparator(a[0], b[0]));
  return into(
    result,
    sorted.map((o) => o[1])
  );
}
function groupBy(collection, keyFn, hashFunction = DEFAULT_HASH_FUNCTION) {
  if (collection.length < 1)
    return /* @__PURE__ */ new Map();
  const lookup = /* @__PURE__ */ new Map();
  const result = /* @__PURE__ */ new Map();
  for (let i = 0; i < collection.length; i++) {
    const obj = collection[i];
    const key = keyFn(obj, i);
    const hash = hashCode(key, hashFunction);
    if (hash === null) {
      if (result.has(null)) {
        result.get(null).push(obj);
      } else {
        result.set(null, [obj]);
      }
    } else {
      const existingKey = lookup.has(hash) ? lookup.get(hash).find((k) => isEqual(k, key)) : null;
      if (isNil(existingKey)) {
        result.set(key, [obj]);
        if (lookup.has(hash)) {
          lookup.get(hash).push(key);
        } else {
          lookup.set(hash, [key]);
        }
      } else {
        result.get(existingKey).push(obj);
      }
    }
  }
  return result;
}
const MAX_ARRAY_PUSH = 5e4;
function into(target, ...rest) {
  if (target instanceof Array) {
    return rest.reduce(
      (acc, arr) => {
        let i = Math.ceil(arr.length / MAX_ARRAY_PUSH);
        let begin = 0;
        while (i-- > 0) {
          Array.prototype.push.apply(
            acc,
            arr.slice(begin, begin + MAX_ARRAY_PUSH)
          );
          begin += MAX_ARRAY_PUSH;
        }
        return acc;
      },
      target
    );
  } else {
    return rest.filter(isObjectLike).reduce((acc, item) => {
      Object.assign(acc, item);
      return acc;
    }, target);
  }
}
function memoize(fn, hashFunction = DEFAULT_HASH_FUNCTION) {
  return /* @__PURE__ */ ((memo) => {
    return (...args) => {
      const key = hashCode(args, hashFunction) || "";
      if (!has(memo, key)) {
        memo[key] = fn.apply(this, args);
      }
      return memo[key];
    };
  })({
    /* storage */
  });
}
function getValue(obj, key) {
  return isObjectLike(obj) ? obj[key] : void 0;
}
function unwrap(arr, depth) {
  if (depth < 1)
    return arr;
  while (depth-- && arr.length === 1)
    arr = arr[0];
  return arr;
}
function resolve(obj, selector, options) {
  let depth = 0;
  function resolve2(o, path) {
    let value = o;
    for (let i = 0; i < path.length; i++) {
      const field = path[i];
      const isText = /^\d+$/.exec(field) === null;
      if (isText && value instanceof Array) {
        if (i === 0 && depth > 0)
          break;
        depth += 1;
        const subpath = path.slice(i);
        value = value.reduce((acc, item) => {
          const v = resolve2(item, subpath);
          if (v !== void 0)
            acc.push(v);
          return acc;
        }, []);
        break;
      } else {
        value = getValue(value, field);
      }
      if (value === void 0)
        break;
    }
    return value;
  }
  const result = JS_SIMPLE_TYPES.has(getType(obj).toLowerCase()) ? obj : resolve2(obj, selector.split("."));
  return result instanceof Array && options?.unwrapArray ? unwrap(result, depth) : result;
}
function resolveGraph(obj, selector, options) {
  const names = selector.split(".");
  const key = names[0];
  const next = names.slice(1).join(".");
  const isIndex = /^\d+$/.exec(key) !== null;
  const hasNext = names.length > 1;
  let result;
  let value;
  if (obj instanceof Array) {
    if (isIndex) {
      result = getValue(obj, Number(key));
      if (hasNext) {
        result = resolveGraph(result, next, options);
      }
      result = [result];
    } else {
      result = [];
      for (const item of obj) {
        value = resolveGraph(item, selector, options);
        if (options?.preserveMissing) {
          if (value === void 0) {
            value = MISSING;
          }
          result.push(value);
        } else if (value !== void 0) {
          result.push(value);
        }
      }
    }
  } else {
    value = getValue(obj, key);
    if (hasNext) {
      value = resolveGraph(value, next, options);
    }
    if (value === void 0)
      return void 0;
    result = options?.preserveKeys ? { ...obj } : {};
    result[key] = value;
  }
  return result;
}
function filterMissing(obj) {
  if (obj instanceof Array) {
    for (let i = obj.length - 1; i >= 0; i--) {
      if (obj[i] === MISSING) {
        obj.splice(i, 1);
      } else {
        filterMissing(obj[i]);
      }
    }
  } else if (isObject(obj)) {
    for (const k in obj) {
      if (has(obj, k)) {
        filterMissing(obj[k]);
      }
    }
  }
}
const NUMBER_RE = /^\d+$/;
function walk(obj, selector, fn, options) {
  const names = selector.split(".");
  const key = names[0];
  const next = names.slice(1).join(".");
  if (names.length === 1) {
    if (isObject(obj) || isArray(obj) && NUMBER_RE.test(key)) {
      fn(obj, key);
    }
  } else {
    if (options?.buildGraph && isNil(obj[key])) {
      obj[key] = {};
    }
    const item = obj[key];
    if (!item)
      return;
    const isNextArrayIndex = !!(names.length > 1 && NUMBER_RE.test(names[1]));
    if (item instanceof Array && options?.descendArray && !isNextArrayIndex) {
      item.forEach((e) => walk(e, next, fn, options));
    } else {
      walk(item, next, fn, options);
    }
  }
}
function setValue(obj, selector, value) {
  walk(
    obj,
    selector,
    (item, key) => {
      item[key] = isFunction(value) ? value(item[key]) : value;
    },
    { buildGraph: true }
  );
}
function removeValue(obj, selector, options) {
  walk(
    obj,
    selector,
    (item, key) => {
      if (item instanceof Array) {
        if (/^\d+$/.test(key)) {
          item.splice(parseInt(key), 1);
        } else if (options && options.descendArray) {
          for (const elem of item) {
            if (isObject(elem)) {
              delete elem[key];
            }
          }
        }
      } else if (isObject(item)) {
        delete item[key];
      }
    },
    options
  );
}
const OPERATOR_NAME_PATTERN = /^\$[a-zA-Z0-9_]+$/;
function isOperator(name) {
  return OPERATOR_NAME_PATTERN.test(name);
}
function normalize(expr) {
  if (JS_SIMPLE_TYPES.has(getType(expr).toLowerCase())) {
    return isRegExp(expr) ? { $regex: expr } : { $eq: expr };
  }
  if (isObjectLike(expr)) {
    const exprObj = expr;
    if (!Object.keys(exprObj).some(isOperator)) {
      return { $eq: expr };
    }
    if (has(expr, "$regex")) {
      const newExpr = { ...expr };
      newExpr["$regex"] = new RegExp(
        expr["$regex"],
        expr["$options"]
      );
      delete newExpr["$options"];
      return newExpr;
    }
  }
  return expr;
}
function findInsertIndex(sorted, item) {
  let lo = 0;
  let hi = sorted.length - 1;
  while (lo <= hi) {
    const mid = Math.round(lo + (hi - lo) / 2);
    if (compare(item, sorted[mid]) < 0) {
      hi = mid - 1;
    } else if (compare(item, sorted[mid]) > 0) {
      lo = mid + 1;
    } else {
      return mid;
    }
  }
  return lo;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MAX_INT,
  MAX_LONG,
  MIN_INT,
  MIN_LONG,
  MingoError,
  assert,
  cloneDeep,
  compare,
  ensureArray,
  filterMissing,
  findInsertIndex,
  flatten,
  getType,
  groupBy,
  has,
  hashCode,
  inArray,
  intersection,
  into,
  isArray,
  isBigInt,
  isBoolean,
  isDate,
  isEmpty,
  isEqual,
  isFunction,
  isMissing,
  isNil,
  isNotNaN,
  isNumber,
  isObject,
  isObjectLike,
  isOperator,
  isRegExp,
  isString,
  isSymbol,
  memoize,
  merge,
  normalize,
  notInArray,
  removeValue,
  resolve,
  resolveGraph,
  setValue,
  sortBy,
  stringify,
  truthy,
  unique,
  walk
});
