import {useEffect, useState} from 'react';

/**
 * Convenience hook that implements a debounce.
 * The debounce uses an internal timer to execute the callback function every xx seconds (2nd parameter).
 *
 * @param value The value to monitor
 * @param delay The time, in milliseconds, the timer should delay setting the debounce value
 *
 * @see https://usehooks-ts.com/react-hook/use-debounce
 */
export function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
