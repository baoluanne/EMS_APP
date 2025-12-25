import Grid from '@mui/material/Grid';
import { ControlledCheckbox, ControlledTextField } from '@renderer/components/controlled-fields';
import { useFormContext } from 'react-hook-form';

export const DanhMucBacDaoTaoForm = () => {
  const { control } = useFormContext();

  return (
    <Grid container spacing={2}>
      {/* Row 1 */}
      <Grid size={6}>
        <ControlledTextField control={control} name="maBacDaoTao" label="Mã bậc đào tạo" required />
      </Grid>
      <Grid size={6}>
        <ControlledTextField
          control={control}
          name="tenBacDaoTao"
          label="Tên bậc đào tạo"
          required
        />
      </Grid>

      {/* Row 2 */}
      <Grid size={6}>
        <ControlledTextField control={control} name="tenTiengAnh" label="Tên tiếng Anh" />
      </Grid>
      <Grid size={6}>
        <ControlledTextField control={control} name="hinhThucDaoTao" label="Hình thức đào tạo" />
      </Grid>

      {/* Row 3 */}
      <Grid size={6}>
        <ControlledTextField control={control} name="ghiChu" label="Ghi chú" />
      </Grid>
      <Grid size={4}>
        <ControlledTextField control={control} name="stt" label="STT" type="number" />
      </Grid>

      <Grid size={2}>
        <ControlledCheckbox control={control} name="isVisible" label="Hiển thị" />
      </Grid>

      {/* Row 4 */}
      <Grid size={6}>
        <ControlledTextField control={control} name="tenLoaiBangCapTN" label="Loại bằng cấp TN" />
      </Grid>
      <Grid size={6}>
        <ControlledTextField
          control={control}
          name="tenLoaiBangCapTN_ENG"
          label="Loại bằng cấp TN (TA)"
        />
      </Grid>

      {/* Row 5 */}
      <Grid size={12}>
        <ControlledTextField control={control} name="phongBanKyBM" label="Phòng ban ký BM" />
      </Grid>
    </Grid>
  );
};
