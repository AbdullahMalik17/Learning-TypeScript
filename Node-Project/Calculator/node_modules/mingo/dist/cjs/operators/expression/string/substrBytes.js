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
var substrBytes_exports = {};
__export(substrBytes_exports, {
  $substrBytes: () => $substrBytes
});
module.exports = __toCommonJS(substrBytes_exports);
var import_core = require("../../../core");
var import_util = require("../../../util");
const UTF8_MASK = [192, 224, 240];
function toUtf8(n) {
  if (n < 128)
    return [n];
  let count = n < 2048 && 1 || n < 65536 && 2 || 3;
  const offset = UTF8_MASK[count - 1];
  const utf8 = [(n >> 6 * count) + offset];
  while (count > 0)
    utf8.push(128 | n >> 6 * --count & 63);
  return utf8;
}
function utf8Encode(s) {
  const buf = [];
  for (let i = 0, len = s.length; i < len; i++) {
    buf.push(toUtf8(s.codePointAt(i)));
  }
  return buf;
}
const $substrBytes = (obj, expr, options) => {
  const args = (0, import_core.computeValue)(obj, expr, null, options);
  const s = args[0];
  const index = args[1];
  const count = args[2];
  (0, import_util.assert)(
    (0, import_util.isString)(s) && (0, import_util.isNumber)(index) && index >= 0 && (0, import_util.isNumber)(count) && count >= 0,
    "$substrBytes: invalid arguments"
  );
  const buf = utf8Encode(s);
  const validIndex = [];
  let acc = 0;
  for (let i = 0; i < buf.length; i++) {
    validIndex.push(acc);
    acc += buf[i].length;
  }
  const begin = validIndex.indexOf(index);
  const end = validIndex.indexOf(index + count);
  (0, import_util.assert)(
    begin > -1 && end > -1,
    "$substrBytes: invalid range, start or end index is a UTF-8 continuation byte."
  );
  return s.substring(begin, end);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $substrBytes
});
