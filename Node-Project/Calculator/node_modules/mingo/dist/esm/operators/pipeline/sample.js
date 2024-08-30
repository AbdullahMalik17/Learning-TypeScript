const $sample = (collection, expr, _options) => {
  return collection.transform((xs) => {
    const len = xs.length;
    let i = -1;
    return () => {
      if (++i === expr.size)
        return { done: true };
      const n = Math.floor(Math.random() * len);
      return { value: xs[n], done: false };
    };
  });
};
export {
  $sample
};
