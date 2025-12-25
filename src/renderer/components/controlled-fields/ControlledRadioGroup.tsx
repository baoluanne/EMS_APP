import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  RadioGroupProps,
  Stack,
} from '@mui/material';
import { Option } from '@renderer/shared/types';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface ControlledRadioGroupProps<T extends FieldValues> extends RadioGroupProps {
  name: Path<T>;
  control: Control<T>;
  options: Option[];
}

export const ControlledRadioGroup = <T extends FieldValues>({
  name,
  control,
  options,
  ...rest
}: ControlledRadioGroupProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControl>
          <RadioGroup {...field} {...rest}>
            <Stack direction="row" alignItems="center" pl={1.5}>
              {options.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio disabled={option.disabled} />}
                  label={option.label}
                />
              ))}
            </Stack>
          </RadioGroup>
        </FormControl>
      )}
    />
  );
};
