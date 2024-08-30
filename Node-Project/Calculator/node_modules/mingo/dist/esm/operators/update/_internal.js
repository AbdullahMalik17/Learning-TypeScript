import { Query } from "../../query";
import {
  assert,
  cloneDeep,
  isArray,
  isDate,
  isObject,
  resolve,
  walk
} from "../../util";
const clone = (mode, val) => {
  switch (mode) {
    case "deep":
      return cloneDeep(val);
    case "copy": {
      if (isDate(val))
        return new Date(val);
      if (isArray(val))
        return [...val];
      if (isObject(val))
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
  assert(
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
    walk(o, parent, g, opts);
    return b;
  }
  const t = resolve(o, parent);
  if (!isArray(t))
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
        queries[k] = new Query(condition, options.queryOptions);
      }
      if (callback(val, node, queries))
        res.push(node.parent);
    }
  }
  return res;
}
export {
  applyUpdate,
  clone,
  tokenizePath,
  walkExpression
};
