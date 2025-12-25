import { Box, Chip, Menu, MenuItem, Typography, useTheme } from '@mui/material';
import { IconChevronDown } from '@tabler/icons-react';
import React from 'react';

export interface Filter {
  key: string;
  label: string;
  value?: string;
  options: string[];
}

interface Props {
  filter: Filter;
  onChange: (key: string, value: string) => void;
}

export const FilterChip = ({ filter, onChange }: Props) => {
  const { palette } = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleSelect = (value: string) => {
    onChange(filter.key, value);
    handleClose();
  };

  return (
    <>
      <Chip
        onClick={handleClick}
        variant="outlined"
        sx={{
          borderStyle: 'dashed',
          borderRadius: '20px',
          borderColor: palette.primary.main,
          backgroundColor: 'rgba(37, 53, 157, 0.08)',
          p: 0.5,
        }}
        label={
          <Box display="flex" alignItems="center" gap={0.5}>
            <Typography fontWeight="bold" color={palette.primary.main}>
              {filter.label}:
            </Typography>
            <Typography color={palette.primary.main}>{filter.value || 'Chọn'}</Typography>
            <IconChevronDown size={16} color={palette.primary.main} />
          </Box>
        }
      />
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {filter.options.map((option) => (
          <MenuItem
            key={option}
            selected={option === filter.value}
            onClick={() => handleSelect(option)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
