import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import { AddFilterMenu, Filter, FilterChip } from './filters';

interface Props {
  initialFilters?: Filter[];
  availableFilters: Filter[];
  filters?: Filter[];
  setFilters?: React.Dispatch<React.SetStateAction<Filter[]>>;
}

export const FiltersToolbar = ({
  initialFilters = [],
  availableFilters,
  filters: propFilters,
  setFilters: propSetFilters,
}: Props) => {
  const [_filters, _setFilters] = useState<Filter[]>(initialFilters);

  const filters = propFilters ?? _filters;
  const setFilters = propSetFilters ?? _setFilters;

  const [addFilterAnchorEl, setAddFilterAnchorEl] = useState<null | HTMLElement>(null);

  const handleChange = (key: string, value: string) => {
    setFilters((prev) => prev.map((f) => (f.key === key ? { ...f, value } : f)));
  };

  const handleAddClick = (event: React.MouseEvent<HTMLElement>) => {
    setAddFilterAnchorEl(event.currentTarget);
  };

  const handleToggleFilter = (filter: Filter) => {
    setFilters((prev) => {
      const exists = prev.find((f) => f.key === filter.key);
      if (exists) {
        return prev.filter((f) => f.key !== filter.key);
      }
      return [...prev, filter];
    });
  };

  return (
    <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
      {filters.map((filter) => (
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
