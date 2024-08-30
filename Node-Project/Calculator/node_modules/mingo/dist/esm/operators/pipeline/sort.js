import {
  compare,
  groupBy,
  into,
  isEmpty,
  isObject,
  isString,
  resolve
} from "../../util";
const $sort = (collection, sortKeys, options) => {
  if (isEmpty(sortKeys) || !isObject(sortKeys))
    return collection;
  let cmp = compare;
  const collationSpec = options.collation;
  if (isObject(collationSpec) && isString(collationSpec.locale)) {
    cmp = collationComparator(collationSpec);
  }
  return collection.transform((coll) => {
    const modifiers = Object.keys(sortKeys);
    for (const key of modifiers.reverse()) {
      const groups = groupBy(
        coll,
        (obj) => resolve(obj, key),
        options.hashFunction
      );
      const sortedKeys = Array.from(groups.keys()).sort(cmp);
      if (sortKeys[key] === -1)
        sortedKeys.reverse();
      coll = [];
      sortedKeys.reduce(
        (acc, key2) => into(acc, groups.get(key2)),
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
    if (!isString(a) || !isString(b))
      return compare(a, b);
    const i = collator.compare(a, b);
    if (i < 0)
      return -1;
    if (i > 0)
      return 1;
    return 0;
  };
}
export {
  $sort
};
