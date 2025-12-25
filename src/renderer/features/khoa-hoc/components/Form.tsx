import Grid from '@mui/material/Grid';
import { ControlledCheckbox, ControlledTextField } from '@renderer/components/controlled-fields';
import { useFormContext } from 'react-hook-form';

export const KhoaHocForm = () => {
  const { control } = useFormContext();

  return (
    <Grid container spacing={2}>
      {/* Row 1 */}
      <Grid size={{ xs: 12, md: 6 }}>
        <ControlledTextField control={control} name="tenKhoaHoc" label="Tên khóa học" required fullWidth />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <ControlledTextField control={control} name="nam" label="Năm" type="text" required fullWidth />
      </Grid>

      {/* Row 2 */}
      <Grid size={{ xs: 12, md: 6 }}>
        <ControlledTextField control={control} name="cachViet" label="Cách viết" fullWidth />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', alignItems: 'center' }}>
        <ControlledCheckbox control={control} name="isVisible" label="Hiển thị" />
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
