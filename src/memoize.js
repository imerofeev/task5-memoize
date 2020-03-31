import { lazy } from "./lazy";
import { allreadyMemoized } from "./allreadyMemoized";

export const memoize = func => {
  switch (func.length) {
    case 0: {
      return lazy(func);
    }
    case 1: {
      return allreadyMemoized(arg);
    }
    case 2: {
      return allreadyMemoized(arg1 => allreadyMemoized(arg2 => func(arg1, arg2)));
    }
    case 3: {
      return allreadyMemoized(arg1 => allreadyMemoized(arg2 => allreadyMemoized(arg3 => func(arg1, arg2, arg3))));
    }
  }
};
