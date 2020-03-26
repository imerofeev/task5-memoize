function memoize(func) {
  const cache = new Map();
  return function allreadyMemoized(arg) {
    const key = arg;
    let result = null;

    if (cache.has(key)) {
      return cache.get(key);
    }

    result = func(arg);
    cache.set(key, result);
    return result;
  }
}

module.exports = { memoize };