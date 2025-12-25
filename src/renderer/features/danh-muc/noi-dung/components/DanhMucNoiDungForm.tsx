import { Box, Stack } from '@mui/material';
import { ControlledCheckbox, ControlledTextField } from '@renderer/components/controlled-fields';
import { useFormContext } from 'react-hook-form';

export const DanhMucNoiDungForm = () => {
  const { control } = useFormContext();

  return (
    <Stack gap={2}>
      <Stack direction="row" gap={2} alignItems="center">
        <Box sx={{ width: '45%' }}>
          <ControlledTextField
            control={control}
            name="loaiNoiDung"
            label="Loại nội dung"
            required
          />
        </Box>
        <Box sx={{ width: '45%' }}>
          <ControlledTextField control={control} name="noiDung" label="Nội dung" required />
        </Box>
        <Box sx={{ width: '10%' }}>
          <ControlledCheckbox control={control} name="isVisible" label="Hiển thị" />
        </Box>
      </Stack>
    </Stack>
  );
};
