import { $mergeObjects as __mergeObjects } from "../expression/object/mergeObjects";
const $mergeObjects = (collection, _, options) => __mergeObjects({ docs: collection }, "$docs", options);
export {
  $mergeObjects
};
