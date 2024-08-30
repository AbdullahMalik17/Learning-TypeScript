import { MingoError } from "./util";
function Lazy(source) {
  return source instanceof Iterator ? source : new Iterator(source);
}
function compose(...iterators) {
  let index = 0;
  return Lazy(() => {
    while (index < iterators.length) {
      const o = iterators[index].next();
      if (!o.done)
        return o;
      index++;
    }
    return { done: true };
  });
}
function isGenerator(o) {
  return !!o && typeof o === "object" && o?.next instanceof Function;
}
function dropItem(array, i) {
  const rest = array.slice(i + 1);
  array.splice(i);
  Array.prototype.push.apply(array, rest);
}
const DONE = new Error();
var Action = /* @__PURE__ */ ((Action2) => {
  Action2[Action2["MAP"] = 0] = "MAP";
  Action2[Action2["FILTER"] = 1] = "FILTER";
  Action2[Action2["TAKE"] = 2] = "TAKE";
  Action2[Action2["DROP"] = 3] = "DROP";
  return Action2;
})(Action || {});
function createCallback(nextFn, iteratees, buffer) {
  let done = false;
  let index = -1;
  let bufferIndex = 0;
  return function(storeResult) {
    try {
      outer:
        while (!done) {
          let o = nextFn();
          index++;
          let i = -1;
          const size = iteratees.length;
          let innerDone = false;
          while (++i < size) {
            const r = iteratees[i];
            switch (r.action) {
              case 0 /* MAP */:
                o = r.func(o, index);
                break;
              case 1 /* FILTER */:
                if (!r.func(o, index))
                  continue outer;
                break;
              case 2 /* TAKE */:
                --r.count;
                if (!r.count)
                  innerDone = true;
                break;
              case 3 /* DROP */:
                --r.count;
                if (!r.count)
                  dropItem(iteratees, i);
                continue outer;
              default:
                break outer;
            }
          }
          done = innerDone;
          if (storeResult) {
            buffer[bufferIndex++] = o;
          } else {
            return { value: o, done: false };
          }
        }
    } catch (e) {
      if (e !== DONE)
        throw e;
    }
    done = true;
    return { done };
  };
}
class Iterator {
  /**
   * @param {*} source An iterable object or function.
   *    Array - return one element per cycle
   *    Object{next:Function} - call next() for the next value (this also handles generator functions)
   *    Function - call to return the next value
   * @param {Function} fn An optional transformation function
   */
  constructor(source) {
    this.iteratees = [];
    this.yieldedValues = [];
    this.isDone = false;
    let nextVal;
    if (source instanceof Function) {
      source = { next: source };
    }
    if (isGenerator(source)) {
      const src = source;
      nextVal = () => {
        const o = src.next();
        if (o.done)
          throw DONE;
        return o.value;
      };
    } else if (source instanceof Array) {
      const data = source;
      const size = data.length;
      let index = 0;
      nextVal = () => {
        if (index < size)
          return data[index++];
        throw DONE;
      };
    } else if (!(source instanceof Function)) {
      throw new MingoError(
        `Lazy must be initialized with an array, generator, or function.`
      );
    }
    this.getNext = createCallback(nextVal, this.iteratees, this.yieldedValues);
  }
  /**
   * Add an iteratee to this lazy sequence
   */
  push(action, value) {
    if (typeof value === "function") {
      this.iteratees.push({ action, func: value });
    } else if (typeof value === "number") {
      this.iteratees.push({ action, count: value });
    }
    return this;
  }
  next() {
    return this.getNext();
  }
  // Iteratees methods
  /**
   * Transform each item in the sequence to a new value
   * @param {Function} f
   */
  map(f) {
    return this.push(0 /* MAP */, f);
  }
  /**
   * Select only items matching the given predicate
   * @param {Function} pred
   */
  filter(predicate) {
    return this.push(1 /* FILTER */, predicate);
  }
  /**
   * Take given numbe for values from sequence
   * @param {Number} n A number greater than 0
   */
  take(n) {
    return n > 0 ? this.push(2 /* TAKE */, n) : this;
  }
  /**
   * Drop a number of values from the sequence
   * @param {Number} n Number of items to drop greater than 0
   */
  drop(n) {
    return n > 0 ? this.push(3 /* DROP */, n) : this;
  }
  // Transformations
  /**
   * Returns a new lazy object with results of the transformation
   * The entire sequence is realized.
   *
   * @param {Callback<Source, RawArray>} fn Tranform function of type (Array) => (Any)
   */
  transform(fn) {
    const self = this;
    let iter;
    return Lazy(() => {
      if (!iter) {
        iter = Lazy(fn(self.value()));
      }
      return iter.next();
    });
  }
  // Terminal methods
  /**
   * Returns the fully realized values of the iterators.
   * The return value will be an array unless `lazy.first()` was used.
   * The realized values are cached for subsequent calls.
   */
  value() {
    if (!this.isDone) {
      this.isDone = this.getNext(true).done;
    }
    return this.yieldedValues;
  }
  /**
   * Execute the funcion for each value. Will stop when an execution returns false.
   * @param {Function} f
   * @returns {Boolean} false iff `f` return false for AnyVal execution, otherwise true
   */
  each(f) {
    for (; ; ) {
      const o = this.next();
      if (o.done)
        break;
      if (f(o.value) === false)
        return false;
    }
    return true;
  }
  /**
   * Returns the reduction of sequence according the reducing function
   *
   * @param {*} f a reducing function
   * @param {*} initialValue
   */
  reduce(f, initialValue) {
    let o = this.next();
    if (initialValue === void 0 && !o.done) {
      initialValue = o.value;
      o = this.next();
    }
    while (!o.done) {
      initialValue = f(initialValue, o.value);
      o = this.next();
    }
    return initialValue;
  }
  /**
   * Returns the number of matched items in the sequence
   */
  size() {
    return this.reduce(
      (acc, _) => ++acc,
      0
    );
  }
  [Symbol.iterator]() {
    return this;
  }
}
export {
  Iterator,
  Lazy,
  compose
};
