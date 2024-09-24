function throttle<T extends (...args: any[]) => any>(
  fn: T,
  wait: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    const now = new Date().getTime();
    if (now - lastCall >= wait) {
      lastCall = now;
      fn.apply(this, args);
    }
  };
}

export default throttle;
