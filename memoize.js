function memoize(func) {
  if (typeof func === 'undefined' || typeof func !== 'function') {
    return null;
  }
  const cache = {};
  function allreadyMemoized(...args) {
    const key = JSON.stringify(args);

    if (key in cache) {
      return cache[key];
    }

    const result = func.apply(this, args);
    cache[key] = result;
    return result;
  }
  return allreadyMemoized;
}

module.exports = { memoize };