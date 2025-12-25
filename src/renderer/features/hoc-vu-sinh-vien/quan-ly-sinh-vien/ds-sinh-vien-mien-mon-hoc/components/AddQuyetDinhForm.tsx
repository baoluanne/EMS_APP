import { Grid } from '@mui/material';
import { ControlledDatePicker, ControlledTextField } from '@renderer/components/controlled-fields';
import { useFormContext } from 'react-hook-form';
import { QuyetDinhFormDataType } from '@renderer/features/hoc-vu-sinh-vien/quan-ly-sinh-vien/ds-sinh-vien-mien-mon-hoc';

export const AddQuyetDinhForm = () => {
  const { control } = useFormContext<QuyetDinhFormDataType>();
  return (
    <Grid container spacing={2}>
      <Grid size={6}>
        <ControlledTextField control={control} name="soQuyetDinh" label="Số quyết định" required />
      </Grid>
      <Grid size={6}>
        <ControlledTextField
          control={control}
          name="tenQuyetDinh"
          label="Tên quyết định"
          required
        />
      </Grid>
      <Grid size={6}>
        <ControlledDatePicker control={control} name="ngayRaQuyetDinh" label="Ngày quyết định" />
      </Grid>
      <Grid size={6}>
        <ControlledTextField control={control} name="nguoiKyQD" label="Người ký" />
      </Grid>
      <Grid size={12}>
        <ControlledTextField control={control} name="noiDung" label="Nội dung" />
      </Grid>
    </Grid>
  );
};
