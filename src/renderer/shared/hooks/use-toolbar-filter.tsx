import { FilterV2 } from '@renderer/components/toolbars';
import { useCallback, useState } from 'react';

export const useToolbarFilter = <T extends Record<string, any>>(initFilters: FilterV2[]) => {
  const [selectedFilters, setFilters] = useState<FilterV2[]>(initFilters);

  const filters = selectedFilters
    .filter((filter) => !!filter.value)
    .map((each) => ({
      key: each.key,
      value: each.value,
    }));

  const getNestedValue = (obj: any, path: string): any => {
    return path.split('.').reduce((o, key) => (o ? o[key] : undefined), obj);
  };

  const filterData = useCallback(
    (data: T[], keyword?: string, keywordFields?: (keyof T)[]) => {
      return data.filter((item) => {
        // Handle keyword search if provided
        const matchesKeyword =
          !keyword || !keywordFields
            ? true
            : keywordFields.some((field) => {
              const value = item[field];
              return value?.toString().toLowerCase().includes(keyword.toLowerCase());
            });

        // Handle filters (support nested keys)
        const matchesFilters =
          filters.length === 0 ||
          filters.every((filter) => {
            const itemValue = getNestedValue(item, filter.key);
            return itemValue?.toString() === filter.value?.toString();
          });

        return matchesKeyword && matchesFilters;
      });
    },
    [filters],
  );
  return {
    filterProps: { filters: selectedFilters, setFilters },
    filters,
    filterData,
  };
};
