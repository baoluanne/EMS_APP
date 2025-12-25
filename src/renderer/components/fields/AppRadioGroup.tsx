import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  SxProps,
} from '@mui/material';
import { Option } from '@renderer/shared/types';
import { ReactNode } from 'react';

interface AppRadioGroupProps {
  value?: string;
  onChange: (value: string) => void;
  options: Option[];
  label?: ReactNode;
  defaultValue?: string;
  groupSx?: SxProps;
  row?: boolean;
}

export const AppRadioGroup = ({
  value,
  onChange,
  defaultValue,
  options,
  label,
  groupSx,
  row = false,
}: AppRadioGroupProps) => {
  return (
    <FormControl>
      {label && <FormLabel>{label}</FormLabel>}
      <RadioGroup
        sx={groupSx}
        defaultValue={defaultValue}
        onChange={(e) => onChange(e.target.value)}
        value={value}
        row={row}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
