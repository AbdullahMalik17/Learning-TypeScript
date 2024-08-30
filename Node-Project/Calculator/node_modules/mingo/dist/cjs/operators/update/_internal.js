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
var internal_exports = {};
__export(internal_exports, {
  applyUpdate: () => applyUpdate,
  clone: () => clone,
  tokenizePath: () => tokenizePath,
  walkExpression: () => walkExpression
});
module.exports = __toCommonJS(internal_exports);
var import_query = require("../../query");
var import_util = require("../../util");
const clone = (mode, val) => {
  switch (mode) {
    case "deep":
      return (0, import_util.cloneDeep)(val);
    case "copy": {
      if ((0, import_util.isDate)(val))
        return new Date(val);
      if ((0, import_util.isArray)(val))
        return [...val];
      if ((0, import_util.isObject)(val))
        return { ...val };
      return val;
    }
    default:
      return val;
  }
};
const FILTER_IDENT_RE = /^[a-z]+[a-zA-Z0-9]*$/;
function tokenizePath(selector) {
  if (!selector.includes(".$")) {
    return [{ parent: selector, selector }, []];
  }
  const begin = selector.indexOf(".$");
  const end = selector.indexOf("]");
  const parent = selector.substring(0, begin);
  const child = selector.substring(begin + 3, end);
  (0, import_util.assert)(
    child === "" || FILTER_IDENT_RE.test(child),
    "The filter <identifier> must begin with a lowercase letter and contain only alphanumeric characters."
  );
  const rest = selector.substring(end + 2);
  const [next, elems] = rest ? tokenizePath(rest) : [];
  return [
    { selector, parent, child: child || "$", next },
    [child, ...elems || []].filter(Boolean)
  ];
}
const applyUpdate = (o, n, q, f, opts) => {
  const { parent, child: c, next } = n;
  if (!c) {
    let b = false;
    const g = (u, k) => b = Boolean(f(u, k)) || b;
    (0, import_util.walk)(o, parent, g, opts);
    return b;
  }
  const t = (0, import_util.resolve)(o, parent);
  if (!(0, import_util.isArray)(t))
    return false;
  return t.map((e, i) => {
    if (q[c] && !q[c].test({ [c]: e }))
      return false;
    return next ? applyUpdate(e, next, q, f, opts) : f(t, i);
  }).some(Boolean);
};
function walkExpression(expr, arrayFilter, options, callback) {
  const res = [];
  for (const [selector, val] of Object.entries(expr)) {
    const [node, vars] = tokenizePath(selector);
    if (!vars.length) {
      if (callback(val, node, {}))
        res.push(node.parent);
    } else {
      const conditions = {};
      arrayFilter.forEach((o) => {
        Object.keys(o).forEach((k) => {
          vars.forEach((w) => {
            if (k === w || k.startsWith(w + ".")) {
              conditions[w] = conditions[w] || {};
              Object.assign(conditions[w], { [k]: o[k] });
            }
          });
        });
      });
      const queries = {};
      for (const [k, condition] of Object.entries(conditions)) {
        queries[k] = new import_query.Query(condition, options.queryOptions);
      }
      if (callback(val, node, queries))
        res.push(node.parent);
    }
  }
  return res;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  applyUpdate,
  clone,
  tokenizePath,
  walkExpression
});
