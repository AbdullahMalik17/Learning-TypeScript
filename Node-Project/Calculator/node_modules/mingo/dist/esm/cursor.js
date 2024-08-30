import { Aggregator } from "./aggregator";
import { compose, Lazy } from "./lazy";
import { isObject } from "./util";
class Cursor {
  constructor(source, predicate, projection, options) {
    this.source = source;
    this.predicate = predicate;
    this.projection = projection;
    this.options = options;
    this.operators = [];
    this.result = null;
    this.buffer = [];
  }
  /** Returns the iterator from running the query */
  fetch() {
    if (this.result)
      return this.result;
    if (isObject(this.projection)) {
      this.operators.push({ $project: this.projection });
    }
    this.result = Lazy(this.source).filter(this.predicate);
    if (this.operators.length > 0) {
      this.result = new Aggregator(this.operators, this.options).stream(
        this.result
      );
    }
    return this.result;
  }
  /** Returns an iterator with the buffered data included */
  fetchAll() {
    const buffered = Lazy([...this.buffer]);
    this.buffer = [];
    return compose(buffered, this.fetch());
  }
  /**
   * Return remaining objects in the cursor as an array. This method exhausts the cursor
   * @returns {Array}
   */
  all() {
    return this.fetchAll().value();
  }
  /**
   * Returns the number of objects return in the cursor. This method exhausts the cursor
   * @returns {Number}
   */
  count() {
    return this.all().length;
  }
  /**
   * Returns a cursor that begins returning results only after passing or skipping a number of documents.
   * @param {Number} n the number of results to skip.
   * @return {Cursor} Returns the cursor, so you can chain this call.
   */
  skip(n) {
    this.operators.push({ $skip: n });
    return this;
  }
  /**
   * Constrains the size of a cursor's result set.
   * @param {Number} n the number of results to limit to.
   * @return {Cursor} Returns the cursor, so you can chain this call.
   */
  limit(n) {
    this.operators.push({ $limit: n });
    return this;
  }
  /**
   * Returns results ordered according to a sort specification.
   * @param {Object} modifier an object of key and values specifying the sort order. 1 for ascending and -1 for descending
   * @return {Cursor} Returns the cursor, so you can chain this call.
   */
  sort(modifier) {
    this.operators.push({ $sort: modifier });
    return this;
  }
  /**
   * Specifies the collation for the cursor returned by the `mingo.Query.find`
   * @param {*} spec
   */
  collation(spec) {
    this.options = { ...this.options, collation: spec };
    return this;
  }
  /**
   * Returns the next document in a cursor.
   * @returns {Object | Boolean}
   */
  next() {
    if (this.buffer.length > 0) {
      return this.buffer.pop();
    }
    const o = this.fetch().next();
    if (o.done)
      return;
    return o.value;
  }
  /**
   * Returns true if the cursor has documents and can be iterated.
   * @returns {boolean}
   */
  hasNext() {
    if (this.buffer.length > 0)
      return true;
    const o = this.fetch().next();
    if (o.done)
      return false;
    this.buffer.push(o.value);
    return true;
  }
  /**
   * Applies a function to each document in a cursor and collects the return values in an array.
   * @param fn
   * @returns {Array}
   */
  map(fn) {
    return this.all().map(fn);
  }
  /**
   * Applies a JavaScript function for every document in a cursor.
   * @param fn
   */
  forEach(fn) {
    this.all().forEach(fn);
  }
  [Symbol.iterator]() {
    return this.fetchAll();
  }
}
export {
  Cursor
};
