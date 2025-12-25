import Grid from '@mui/material/Grid';
import { ControlledCheckbox, ControlledTextField } from '@renderer/components/controlled-fields';
import { useFormContext } from 'react-hook-form';

export const DanhMucKhoanThuHocPhiForm = () => {
  const { control } = useFormContext();

  return (
    <Grid container spacing={2}>
      {/* Row 1 */}
      <Grid size={{ xs: 12, md: 6 }}>
        <ControlledTextField control={control} name="maKhoanThu" label="Mã khoản thu" required fullWidth />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <ControlledTextField
          control={control}
          name="tenKhoanThu"
          label="Tên khoản thu" required
          fullWidth
        />
      </Grid>

      {/* Row 2 */}
      <Grid size={{ xs: 12, md: 6 }}>
        <ControlledTextField control={control} name="stt" label="STT" type="number" fullWidth />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', alignItems: 'center' }}>
        <ControlledCheckbox control={control} name="capSoHoaDonDienTu" label="Cấp số HĐ điện tử" />
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
