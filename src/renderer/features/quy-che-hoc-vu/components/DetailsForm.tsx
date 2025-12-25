import { Stack } from '@mui/material';
import { ControlledCheckbox, ControlledTextField } from '@renderer/components/controlled-fields';
import { QuyCheHocVu } from '@renderer/shared/types';
import { useFormContext } from 'react-hook-form';

export const DetailsForm = () => {
  const { control } = useFormContext<QuyCheHocVu>();
  return (
    <Stack gap={1}>
      <Stack direction="row" gap={2}>
        <ControlledTextField control={control} name="maQuyChe" label="Mã quy chế" required />
        <ControlledTextField control={control} name="tenQuyChe" label="Tên quy chế" required />
        <ControlledTextField
          control={control}
          name="bieuThuc"
          label="Biểu thức"
          labelChildren={
            <ControlledCheckbox
              name="isNienChe"
              label="Niên chế"
              control={control}
              labelSx={{ width: 65 }}
              sx={{ p: 0, mr: 1 }}
            />
          }
        />
      </Stack>
      <Stack direction="row" gap={4}>
        <ControlledTextField
          control={control}
          labelWidth={150}
          name="ghiChu"
          label="Ghi chú"
          multiline
          minRows={2}
        />
      </Stack>
    </Stack>
  );
};
