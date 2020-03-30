export const lazy = (func) => {
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