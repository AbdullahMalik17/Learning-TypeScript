import {
  ComputeOptions,
  computeValue,
  getOperator,
  OperatorType
} from "../../core";
import {
  assert,
  ensureArray,
  filterMissing,
  has,
  inArray,
  into,
  isEmpty,
  isNil,
  isNumber,
  isObject,
  isOperator,
  isString,
  merge,
  notInArray,
  removeValue,
  resolveGraph,
  setValue
} from "../../util";
const $project = (collection, expr, options) => {
  if (isEmpty(expr))
    return collection;
  let expressionKeys = Object.keys(expr);
  let idOnlyExcluded = false;
  validateExpression(expr, options);
  const ID_KEY = options.idKey;
  if (inArray(expressionKeys, ID_KEY)) {
    const id = expr[ID_KEY];
    if (id === 0 || id === false) {
      expressionKeys = expressionKeys.filter(
        notInArray.bind(null, [ID_KEY])
      );
      idOnlyExcluded = expressionKeys.length == 0;
    }
  } else {
    expressionKeys.push(ID_KEY);
  }
  const copts = ComputeOptions.init(options);
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
    if (key !== options.idKey && inArray([0, false], subExpr)) {
      foundExclusion = true;
    }
    if (key === options.idKey && isEmpty(subExpr)) {
      value = obj[key];
    } else if (isString(subExpr)) {
      value = computeValue(obj, subExpr, key, options);
    } else if (inArray([1, true], subExpr)) {
    } else if (subExpr instanceof Array) {
      value = subExpr.map((v) => {
        const r = computeValue(obj, v, null, options);
        if (isNil(r))
          return null;
        return r;
      });
    } else if (isObject(subExpr)) {
      const subExprObj = subExpr;
      const subExprKeys = Object.keys(subExpr);
      const operator = subExprKeys.length == 1 ? subExprKeys[0] : "";
      const call = getOperator(
        OperatorType.PROJECTION,
        operator,
        options
      );
      if (call) {
        if (operator === "$slice") {
          if (ensureArray(subExprObj[operator]).every(isNumber)) {
            value = call(obj, subExprObj[operator], key, options);
            foundSlice = true;
          } else {
            value = computeValue(obj, subExprObj, key, options);
          }
        } else {
          value = call(obj, subExprObj[operator], key, options);
        }
      } else if (isOperator(operator)) {
        value = computeValue(obj, subExprObj[operator], operator, options);
      } else if (has(obj, key)) {
        validateExpression(subExprObj, options);
        let target = obj[key];
        if (target instanceof Array) {
          value = target.map(
            (o) => processObject(o, subExprObj, options, subExprKeys, false)
          );
        } else {
          target = isObject(target) ? target : obj;
          value = processObject(
            target,
            subExprObj,
            options,
            subExprKeys,
            false
          );
        }
      } else {
        value = computeValue(obj, subExpr, null, options);
      }
    } else {
      dropKeys.push(key);
      continue;
    }
    const objPathGraph = resolveGraph(obj, key, {
      preserveMissing: true
    });
    if (objPathGraph !== void 0) {
      merge(newObj, objPathGraph, {
        flatten: true
      });
    }
    if (notInArray([0, 1, false, true], subExpr)) {
      if (value === void 0) {
        removeValue(newObj, key, { descendArray: true });
      } else {
        setValue(newObj, key, value);
      }
    }
  }
  filterMissing(newObj);
  if (foundSlice || foundExclusion || idOnlyExcluded) {
    newObj = into({}, obj, newObj);
    if (dropKeys.length > 0) {
      for (const k of dropKeys) {
        removeValue(newObj, k, { descendArray: true });
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
    assert(
      !(check[0] && check[1]),
      "Projection cannot have a mix of inclusion and exclusion."
    );
  }
}
export {
  $project
};
