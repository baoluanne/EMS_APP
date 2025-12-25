import { useCallback, useState } from 'react';

export const useFilter = <T extends object>(initialFilter: T = {} as T) => {
  const [filter, setFilterState] = useState<T>(initialFilter);

  const setFilter = useCallback(
    (newFilter: Partial<T>) => {
      setFilterState((prev) => ({
        ...prev,
        ...newFilter,
      }));
    },
    [setFilterState],
  );
  return {
    filter,
    setFilter,
  };
};
