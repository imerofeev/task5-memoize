export const allreadyMemoized = (arg) => {
  const cache = new Map();
  const cacheWeak = new WeakMap();
  const type = typeof arg;

  if ((type === 'object' || type === 'function') && arg !== null) {
    if (cacheWeak.has(arg)) {
      return cacheWeak.get(arg);
    }

    const result = func(arg);
    cacheWeak.set(arg, result);
    return result;
  }

  let values = cache.get(type);

  if (values === undefined) {
    values = new Map();
    cache.set(type, values);
  }

  if (values.has(arg)) {
    return values.get(arg);
  }

  const result = func(arg);
  values.set(arg, result);
  return result;
};
