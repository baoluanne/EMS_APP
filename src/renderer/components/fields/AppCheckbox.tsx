import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  SxProps,
} from '@mui/material';
import { Option } from '@renderer/shared/types';
import { ReactNode } from 'react';

interface AppCheckboxGroupProps {
  value?: string;
  onChange: (value: string) => void;
  options: Option[];
  label?: ReactNode;
  defaultValue?: string;
  groupSx?: SxProps;
}

export const AppCheckboxGroup = ({ options, label, groupSx }: AppCheckboxGroupProps) => {
  return (
    <FormControl>
      {label && <FormLabel>{label}</FormLabel>}
      <FormGroup sx={groupSx}>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Checkbox />}
            label={option.label}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};
