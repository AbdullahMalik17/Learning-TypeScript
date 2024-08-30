import { ComputeOptions, redact } from "../../core";
const $redact = (collection, expr, options) => {
  const copts = ComputeOptions.init(options);
  return collection.map((obj) => redact(obj, expr, copts.update(obj)));
};
export {
  $redact
};
