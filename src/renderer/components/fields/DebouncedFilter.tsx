import {
  IconButton,
  Stack,
  StackProps,
  TextField,
  TextFieldProps,
  TextFieldVariants,
  Typography,
  useTheme,
} from '@mui/material';
import { IconSearch, IconTrashFilled } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useDebounceValue } from 'usehooks-ts';

type DebouncedFilterProps<Variant extends TextFieldVariants> = TextFieldProps<Variant> & {
  onSearch: (val: string) => void;
  initValue?: string;
  containerProps?: StackProps;
};

export const DebouncedFilter = <Variant extends TextFieldVariants>({
  onSearch,
  initValue,
  containerProps,
  ...props
}: DebouncedFilterProps<Variant>) => {
  const { palette } = useTheme();
  const [inputValue, setInputValue] = useState(initValue);
  const [debouncedValue] = useDebounceValue(inputValue, 500);

  useEffect(() => {
    if (debouncedValue === undefined) return;

    onSearch(debouncedValue);
  }, [debouncedValue, onSearch]);

  const handleClear = () => {
    setInputValue('');
    onSearch('');
  };

  return (
    <Stack gap={1} direction="row" alignItems="center" {...containerProps}>
      <IconSearch color={palette.primary.main} />
      <Typography width={110}>Lọc thông tin:</Typography>
      <TextField
        variant="outlined"
        size="small"
        sx={{ flex: 1 }}
        value={inputValue ?? ''}
        onChange={(e) => setInputValue(e.target.value)}
        {...props}
      />
      <IconButton onClick={handleClear}>
        <IconTrashFilled color={palette.error.main} />
      </IconButton>
    </Stack>
  );
};
