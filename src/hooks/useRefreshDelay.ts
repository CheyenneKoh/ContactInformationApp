import {useCallback, useEffect, useRef, useState} from 'react';

/**
 * Returns a refresh method and state value, intended for use in `RefreshControl` components.
 *
 * @param refetch The promise to await when the exported `refresh` method is called
 * @param delay Custom delay that can be used to prevent `isRefreshing` state from changing too soon
 */
export const useRefreshWithDelay = (
  refetch: () => Promise<unknown>,
  delay = 500,
): [boolean, () => Promise<void>] => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const refresh = useCallback(async () => {
    setIsRefreshing(true);

    await refetch();

    timeoutRef.current = setTimeout(() => {
      setIsRefreshing(false);
    }, delay);
  }, [delay, refetch]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return [isRefreshing, refresh];
};
