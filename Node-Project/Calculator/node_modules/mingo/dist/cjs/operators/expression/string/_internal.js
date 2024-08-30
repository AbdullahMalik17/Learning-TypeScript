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
  regexSearch: () => regexSearch,
  trimString: () => trimString
});
module.exports = __toCommonJS(internal_exports);
var import_core = require("../../../core");
var import_util = require("../../../util");
const WHITESPACE_CHARS = [
  0,
  // '\0' Null character
  32,
  // ' ', Space
  9,
  // '\t' Horizontal tab
  10,
  // '\n' Line feed/new line
  11,
  // '\v' Vertical tab
  12,
  // '\f' Form feed
  13,
  // '\r' Carriage return
  160,
  // Non-breaking space
  5760,
  // Ogham space mark
  8192,
  // En quad
  8193,
  // Em quad
  8194,
  // En space
  8195,
  // Em space
  8196,
  // Three-per-em space
  8197,
  // Four-per-em space
  8198,
  // Six-per-em space
  8199,
  // Figure space
  8200,
  // Punctuation space
  8201,
  // Thin space
  8202
  // Hair space
];
function trimString(obj, expr, options, trimOpts) {
  const val = (0, import_core.computeValue)(obj, expr, null, options);
  const s = val.input;
  if ((0, import_util.isNil)(s))
    return null;
  const codepoints = (0, import_util.isNil)(val.chars) ? WHITESPACE_CHARS : val.chars.split("").map((c) => c.codePointAt(0));
  let i = 0;
  let j = s.length - 1;
  while (trimOpts.left && i <= j && codepoints.indexOf(s[i].codePointAt(0)) !== -1)
    i++;
  while (trimOpts.right && i <= j && codepoints.indexOf(s[j].codePointAt(0)) !== -1)
    j--;
  return s.substring(i, j + 1);
}
function regexSearch(obj, expr, options, reOpts) {
  const val = (0, import_core.computeValue)(obj, expr, null, options);
  if (!(0, import_util.isString)(val.input))
    return [];
  const regexOptions = val.options;
  if (regexOptions) {
    (0, import_util.assert)(
      regexOptions.indexOf("x") === -1,
      "extended capability option 'x' not supported"
    );
    (0, import_util.assert)(regexOptions.indexOf("g") === -1, "global option 'g' not supported");
  }
  let input = val.input;
  const re = new RegExp(val.regex, regexOptions);
  let m;
  const matches = new Array();
  let offset = 0;
  while (m = re.exec(input)) {
    const result = {
      match: m[0],
      idx: m.index + offset,
      captures: []
    };
    for (let i = 1; i < m.length; i++)
      result.captures.push(m[i] || null);
    matches.push(result);
    if (!reOpts.global)
      break;
    offset = m.index + m[0].length;
    input = input.substring(offset);
  }
  return matches;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  regexSearch,
  trimString
});
