import { Checkbox, ListItemText, Menu, MenuItem } from '@mui/material';
import { Filter } from './FilterChip';

interface Props {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onToggle: (filter: Filter) => void;
  options: Filter[];
  activeFilterKeys: string[];
}

export const AddFilterMenu = ({
  anchorEl,
  onClose,
  onToggle,
  options,
  activeFilterKeys,
}: Props) => {
  const open = Boolean(anchorEl);

  return (
    <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
      {options.map((filter, index) => {
        const isSelected = activeFilterKeys.includes(filter.key);
        return (
          <MenuItem
            key={filter.key}
            onClick={() => onToggle(filter)}
            sx={{ mt: index === 0 ? 0 : 1 }}
          >
            <Checkbox
              edge="start"
              checked={isSelected}
              tabIndex={-1}
              disableRipple
              sx={{ p: 0, mr: 1 }}
            />
            <ListItemText primary={filter.label} />
          </MenuItem>
        );
      })}
    </Menu>
  );
};
