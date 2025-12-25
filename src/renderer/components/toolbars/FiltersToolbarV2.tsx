import { Box, Typography } from '@mui/material';
import { useMultiListQuery } from '@renderer/shared/queries';
import { Option } from '@renderer/shared/types';
import React, { useState } from 'react';
import { AddFilterMenu, FilterChip } from './filters-v2';

export interface FilterV2 {
  key: string;
  queryKey: string;
  label: string;
  mapper: (data: any[]) => Option[];
  value?: string;
  options?: Option[];
}

interface Props {
  availableFilters: FilterV2[];
  filters: FilterV2[];
  setFilters: React.Dispatch<React.SetStateAction<FilterV2[]>>;
}

export const FiltersToolbarV2 = ({ availableFilters, filters, setFilters }: Props) => {
  const { data, isLoading } = useMultiListQuery(availableFilters.map((each) => each.queryKey));
  const [addFilterAnchorEl, setAddFilterAnchorEl] = useState<null | HTMLElement>(null);

  const handleChange = (key: string, value?: string) => {
    setFilters((prev) => prev.map((f) => (f.key === key ? { ...f, value } : f)));
  };

  const handleAddClick = (event: React.MouseEvent<HTMLElement>) => {
    setAddFilterAnchorEl(event.currentTarget);
  };

  const handleToggleFilter = (filter: FilterV2) => {
    setFilters((prev) => {
      const exists = prev.find((f) => f.key === filter.key);
      if (exists) {
        return prev.filter((f) => f.key !== filter.key);
      }
      return [...prev, filter];
    });
  };

  const mappedFilters: FilterV2[] = isLoading
    ? []
    : filters.map((each) => {
        const filterIndex = availableFilters.findIndex((item) => item.key === each.key);

        if (filterIndex !== -1) {
          return {
            ...each,
            options: each.mapper(data?.[filterIndex] ?? []),
          };
        }

        return each;
      });

  return (
    <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
      {mappedFilters.map((filter) => (
        <FilterChip key={filter.key} filter={filter} onChange={handleChange} />
      ))}

      <Typography
        color="gray"
        sx={{ cursor: 'pointer', whiteSpace: 'nowrap' }}
        onClick={handleAddClick}
      >
        + Bộ lọc
      </Typography>

      <AddFilterMenu
        anchorEl={addFilterAnchorEl}
        onClose={() => setAddFilterAnchorEl(null)}
        onToggle={handleToggleFilter}
        options={availableFilters}
        activeFilterKeys={filters.map((f) => f.key)}
      />
    </Box>
  );
};
