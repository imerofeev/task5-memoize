function memoize(func, funcVariant = func.length) {
  if (typeof (func) !== 'function' || !arguments.length) {
    return null;
  } 
  const cache = new Map();
  const cacheWeak = new WeakMap();
  switch (funcVariant) {
    case 0: {
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
    case 1:  {  
      return function allreadyMemoized(arg) {
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
      }
    }
    default: {
      return function allreadyMemoized(...arg) {
        const hashName = JSON.stringify(arg);
        let result = null;
  
        if (cashe.has(hashName)) {
          return cashe.get(hashName);
        }
  
        result = func(...arg);
        cashe.set(hashName, result);
        return result;
      }
    }
    // default: {
    //   const allreadyMemoized = memoize(arg1 => memoize((...args) => func(arg1, ...args), funcVariant - 1));
    //   return (arg1, ...args) => allreadyMemoized(arg1)(...args);
    // }
  }
}

module.exports = { memoize };
