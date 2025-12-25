import { Stack, StackProps, TextField, TextFieldProps, TextFieldVariants } from '@mui/material';
import { ReactNode, useEffect } from 'react';
import { useDebounceValue } from 'usehooks-ts';

type DebouncedTextFieldProps<Variant extends TextFieldVariants> = Omit<
  TextFieldProps<Variant>,
  'onChange'
> & {
  onChange: (val: string) => void;
  initValue?: string;
  label?: ReactNode;
  containerProps?: StackProps;
};

export const DebouncedTextField = <Variant extends TextFieldVariants>({
  onChange,
  label,
  initValue,
  containerProps,
  ...props
}: DebouncedTextFieldProps<Variant>) => {
  const [debouncedValue, setValue] = useDebounceValue(initValue, 500);

  useEffect(() => {
    if (debouncedValue === undefined) return;

    onChange(debouncedValue);
  }, [debouncedValue, onChange]);

  return (
    <Stack {...containerProps}>
      <TextField
        variant="outlined"
        size="small"
        fullWidth
        label={label}
        onChange={(e) => setValue(e.target.value ?? '')}
        {...props}
      />
    </Stack>
  );
};
