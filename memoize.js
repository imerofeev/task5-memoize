function memoize(func) {
  const cache = new Map();
  return function allreadyMemoized(arg) {
    // const key = arg;
    // let result = null;
    const type = typeof arg;
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
  
//     if (cache.has(key)) {
//       return cache.get(key);
//     }

//     result = func(arg);
//     cache.set(key, result);
//     return result;
//   }
// }

module.exports = { memoize };