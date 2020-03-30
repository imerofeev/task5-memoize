function memoize(func) {
  if (typeof (func) !== 'function' || !arguments.length) return null;
  const cache = new Map();
  const cacheWeak = new WeakMap();
  return function allreadyMemoized(...args) {
    let key = '';
    const type = typeof arg;
    if (!args.length){
      return function lazy (func) {
        let created = false;
        let value;
        return () => {
          if (!created) {
            value = func();
            created = true;
          }
          return value;
        };
      };
    }
    else if ((type === 'object' || type === 'function') && arg !== null) {
      if (cacheWeak.has(arg)) {
        return cacheWeak.get(arg);
      }
      const result = func(arg);
      cacheWeak.set(arg, result);
      return result;
    }
    else {
      for (let i = 0; i < args.length; i += 1) {
        key += args[i] + typeof args[i];
      }
    
      if (cache.has(key)) {
        return cache.get(key);
      }
      const result = func.apply(this, args);
      cache.set(key, result);
      return result;
    }
  };
}

module.exports = { memoize };
