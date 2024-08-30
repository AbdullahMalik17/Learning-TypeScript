import { computeValue } from "../../../core";
import { assert, isNumber, isString } from "../../../util";
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
  const args = computeValue(obj, expr, null, options);
  const s = args[0];
  const index = args[1];
  const count = args[2];
  assert(
    isString(s) && isNumber(index) && index >= 0 && isNumber(count) && count >= 0,
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
  assert(
    begin > -1 && end > -1,
    "$substrBytes: invalid range, start or end index is a UTF-8 continuation byte."
  );
  return s.substring(begin, end);
};
export {
  $substrBytes
};
