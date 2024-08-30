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
var project_exports = {};
__export(project_exports, {
  $project: () => $project
});
module.exports = __toCommonJS(project_exports);
var import_core = require("../../core");
var import_util = require("../../util");
const $project = (collection, expr, options) => {
  if ((0, import_util.isEmpty)(expr))
    return collection;
  let expressionKeys = Object.keys(expr);
  let idOnlyExcluded = false;
  validateExpression(expr, options);
  const ID_KEY = options.idKey;
  if ((0, import_util.inArray)(expressionKeys, ID_KEY)) {
    const id = expr[ID_KEY];
    if (id === 0 || id === false) {
      expressionKeys = expressionKeys.filter(
        import_util.notInArray.bind(null, [ID_KEY])
      );
      idOnlyExcluded = expressionKeys.length == 0;
    }
  } else {
    expressionKeys.push(ID_KEY);
  }
  const copts = import_core.ComputeOptions.init(options);
  return collection.map((obj) => processObject(
    obj,
    expr,
    copts.update(obj),
    expressionKeys,
    idOnlyExcluded
  ));
};
function processObject(obj, expr, options, expressionKeys, idOnlyExcluded) {
  let newObj = {};
  let foundSlice = false;
  let foundExclusion = false;
  const dropKeys = [];
  if (idOnlyExcluded) {
    dropKeys.push(options.idKey);
  }
  for (const key of expressionKeys) {
    let value = void 0;
    const subExpr = expr[key];
    if (key !== options.idKey && (0, import_util.inArray)([0, false], subExpr)) {
      foundExclusion = true;
    }
    if (key === options.idKey && (0, import_util.isEmpty)(subExpr)) {
      value = obj[key];
    } else if ((0, import_util.isString)(subExpr)) {
      value = (0, import_core.computeValue)(obj, subExpr, key, options);
    } else if ((0, import_util.inArray)([1, true], subExpr)) {
    } else if (subExpr instanceof Array) {
      value = subExpr.map((v) => {
        const r = (0, import_core.computeValue)(obj, v, null, options);
        if ((0, import_util.isNil)(r))
          return null;
        return r;
      });
    } else if ((0, import_util.isObject)(subExpr)) {
      const subExprObj = subExpr;
      const subExprKeys = Object.keys(subExpr);
      const operator = subExprKeys.length == 1 ? subExprKeys[0] : "";
      const call = (0, import_core.getOperator)(
        import_core.OperatorType.PROJECTION,
        operator,
        options
      );
      if (call) {
        if (operator === "$slice") {
          if ((0, import_util.ensureArray)(subExprObj[operator]).every(import_util.isNumber)) {
            value = call(obj, subExprObj[operator], key, options);
            foundSlice = true;
          } else {
            value = (0, import_core.computeValue)(obj, subExprObj, key, options);
          }
        } else {
          value = call(obj, subExprObj[operator], key, options);
        }
      } else if ((0, import_util.isOperator)(operator)) {
        value = (0, import_core.computeValue)(obj, subExprObj[operator], operator, options);
      } else if ((0, import_util.has)(obj, key)) {
        validateExpression(subExprObj, options);
        let target = obj[key];
        if (target instanceof Array) {
          value = target.map(
            (o) => processObject(o, subExprObj, options, subExprKeys, false)
          );
        } else {
          target = (0, import_util.isObject)(target) ? target : obj;
          value = processObject(
            target,
            subExprObj,
            options,
            subExprKeys,
            false
          );
        }
      } else {
        value = (0, import_core.computeValue)(obj, subExpr, null, options);
      }
    } else {
      dropKeys.push(key);
      continue;
    }
    const objPathGraph = (0, import_util.resolveGraph)(obj, key, {
      preserveMissing: true
    });
    if (objPathGraph !== void 0) {
      (0, import_util.merge)(newObj, objPathGraph, {
        flatten: true
      });
    }
    if ((0, import_util.notInArray)([0, 1, false, true], subExpr)) {
      if (value === void 0) {
        (0, import_util.removeValue)(newObj, key, { descendArray: true });
      } else {
        (0, import_util.setValue)(newObj, key, value);
      }
    }
  }
  (0, import_util.filterMissing)(newObj);
  if (foundSlice || foundExclusion || idOnlyExcluded) {
    newObj = (0, import_util.into)({}, obj, newObj);
    if (dropKeys.length > 0) {
      for (const k of dropKeys) {
        (0, import_util.removeValue)(newObj, k, { descendArray: true });
      }
    }
  }
  return newObj;
}
function validateExpression(expr, options) {
  const check = [false, false];
  for (const [k, v] of Object.entries(expr)) {
    if (k === options?.idKey)
      return;
    if (v === 0 || v === false) {
      check[0] = true;
    } else if (v === 1 || v === true) {
      check[1] = true;
    }
    (0, import_util.assert)(
      !(check[0] && check[1]),
      "Projection cannot have a mix of inclusion and exclusion."
    );
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $project
});
