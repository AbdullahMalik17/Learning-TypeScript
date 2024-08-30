import { Query } from "../../../query";
import { normalize } from "../../../util";
const $not = (selector, rhs, options) => {
  const criteria = {};
  criteria[selector] = normalize(rhs);
  const query = new Query(criteria, options);
  return (obj) => !query.test(obj);
};
export {
  $not
};
