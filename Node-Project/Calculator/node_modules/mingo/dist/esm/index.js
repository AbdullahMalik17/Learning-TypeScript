import "./init/basic";
import { Aggregator } from "./aggregator";
import { Query } from "./query";
import { Aggregator as Aggregator2 } from "./aggregator";
import { Query as Query2 } from "./query";
function find(collection, criteria, projection, options) {
  return new Query(criteria, options).find(collection, projection);
}
function remove(collection, criteria, options) {
  return new Query(criteria, options).remove(collection);
}
function aggregate(collection, pipeline, options) {
  return new Aggregator(pipeline, options).run(collection);
}
var src_default = {
  Aggregator,
  Query,
  aggregate,
  find,
  remove
};
export {
  Aggregator2 as Aggregator,
  Query2 as Query,
  aggregate,
  src_default as default,
  find,
  remove
};
