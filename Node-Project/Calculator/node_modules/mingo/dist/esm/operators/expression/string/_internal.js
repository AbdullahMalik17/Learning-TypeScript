import { computeValue } from "../../../core";
import { assert, isNil, isString } from "../../../util";
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
  const val = computeValue(obj, expr, null, options);
  const s = val.input;
  if (isNil(s))
    return null;
  const codepoints = isNil(val.chars) ? WHITESPACE_CHARS : val.chars.split("").map((c) => c.codePointAt(0));
  let i = 0;
  let j = s.length - 1;
  while (trimOpts.left && i <= j && codepoints.indexOf(s[i].codePointAt(0)) !== -1)
    i++;
  while (trimOpts.right && i <= j && codepoints.indexOf(s[j].codePointAt(0)) !== -1)
    j--;
  return s.substring(i, j + 1);
}
function regexSearch(obj, expr, options, reOpts) {
  const val = computeValue(obj, expr, null, options);
  if (!isString(val.input))
    return [];
  const regexOptions = val.options;
  if (regexOptions) {
    assert(
      regexOptions.indexOf("x") === -1,
      "extended capability option 'x' not supported"
    );
    assert(regexOptions.indexOf("g") === -1, "global option 'g' not supported");
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
export {
  regexSearch,
  trimString
};
