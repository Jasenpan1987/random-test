export function debounce(func, wait, immediate) {
  let timeout;

  if (!func || typeof func !== "function") {
    throw Error("first argument must be a function");
  }

  return function(...args) {
    const callNow = immediate && !timeout;
    clearTimeout(timeout);

    timeout = setTimeout(function() {
      timeout = null;
      if (!immediate) {
        func.apply(undefined, args);
      }
    }, wait);

    if (callNow) {
      func.apply(undefined, args);
    }
  };
}
