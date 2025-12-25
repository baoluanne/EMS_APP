import { useCallback, useEffect, useState } from 'react';

interface Props<TEntity, TFilter> {
  data?: TEntity[];
  defaultFilters: TFilter;
  filter: (filters: TFilter, item: TEntity) => void;
}

export const useFilterData = <TEntity, TFilter>({
  data,
  defaultFilters,
  filter,
}: Props<TEntity, TFilter>) => {
  const [filters, setFilters] = useState<TFilter>(defaultFilters);
  const [filteredData, setFilteredData] = useState<TEntity[]>([]);

  const filterData = useCallback(() => {
    const newData = (data ?? []).filter((item) => filter(filters, item));

    setFilteredData(newData);
  }, [data, filters]);

  useEffect(() => {
    filterData();
  }, [data, filters, filterData]);

  return { filteredData, setFilters, setFilteredData };
};
