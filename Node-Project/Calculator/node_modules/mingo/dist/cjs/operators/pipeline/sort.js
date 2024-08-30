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
var sort_exports = {};
__export(sort_exports, {
  $sort: () => $sort
});
module.exports = __toCommonJS(sort_exports);
var import_util = require("../../util");
const $sort = (collection, sortKeys, options) => {
  if ((0, import_util.isEmpty)(sortKeys) || !(0, import_util.isObject)(sortKeys))
    return collection;
  let cmp = import_util.compare;
  const collationSpec = options.collation;
  if ((0, import_util.isObject)(collationSpec) && (0, import_util.isString)(collationSpec.locale)) {
    cmp = collationComparator(collationSpec);
  }
  return collection.transform((coll) => {
    const modifiers = Object.keys(sortKeys);
    for (const key of modifiers.reverse()) {
      const groups = (0, import_util.groupBy)(
        coll,
        (obj) => (0, import_util.resolve)(obj, key),
        options.hashFunction
      );
      const sortedKeys = Array.from(groups.keys()).sort(cmp);
      if (sortKeys[key] === -1)
        sortedKeys.reverse();
      coll = [];
      sortedKeys.reduce(
        (acc, key2) => (0, import_util.into)(acc, groups.get(key2)),
        coll
      );
    }
    return coll;
  });
};
const COLLATION_STRENGTH = {
  // Only strings that differ in base letters compare as unequal. Examples: a ≠ b, a = á, a = A.
  1: "base",
  //  Only strings that differ in base letters or accents and other diacritic marks compare as unequal.
  // Examples: a ≠ b, a ≠ á, a = A.
  2: "accent",
  // Strings that differ in base letters, accents and other diacritic marks, or case compare as unequal.
  // Other differences may also be taken into consideration. Examples: a ≠ b, a ≠ á, a ≠ A
  3: "variant"
  // case - Only strings that differ in base letters or case compare as unequal. Examples: a ≠ b, a = á, a ≠ A.
};
function collationComparator(spec) {
  const localeOpt = {
    sensitivity: COLLATION_STRENGTH[spec.strength || 3],
    caseFirst: spec.caseFirst === "off" ? "false" : spec.caseFirst || "false",
    numeric: spec.numericOrdering || false,
    ignorePunctuation: spec.alternate === "shifted"
  };
  if ((spec.caseLevel || false) === true) {
    if (localeOpt.sensitivity === "base")
      localeOpt.sensitivity = "case";
    if (localeOpt.sensitivity === "accent")
      localeOpt.sensitivity = "variant";
  }
  const collator = new Intl.Collator(spec.locale, localeOpt);
  return (a, b) => {
    if (!(0, import_util.isString)(a) || !(0, import_util.isString)(b))
      return (0, import_util.compare)(a, b);
    const i = collator.compare(a, b);
    if (i < 0)
      return -1;
    if (i > 0)
      return 1;
    return 0;
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $sort
});
