import Grid from '@mui/material/Grid';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { useFormContext } from 'react-hook-form';

export const DanhMucKhoanChiForm = () => {
  const { control } = useFormContext();

  return (
    <Grid container spacing={2}>
      {/* Row 1 */}
      <Grid size={{ xs: 12, md: 4.5 }}>
        <ControlledTextField control={control} name="maKhoanChi" label="Mã khoản chi" required fullWidth />
      </Grid>
      <Grid size={{ xs: 12, md: 4.5 }}>
        <ControlledTextField
          control={control}
          name="tenKhoanChi"
          label="Tên khoản chi" required
          fullWidth
        />
      </Grid>

      {/* Row 2 */}
      <Grid size={{ xs: 12, md: 3 }}>
        <ControlledTextField control={control} name="stt" label="STT" type="number" fullWidth />
      </Grid>

      {/* Row 3 */}
      <Grid size={{ xs: 12 }}>
        <ControlledTextField
          control={control}
          name="ghiChu"
          label="Ghi chú"
          multiline
          minRows={2}
          fullWidth
        />
      </Grid>
    </Grid>
  );
};
