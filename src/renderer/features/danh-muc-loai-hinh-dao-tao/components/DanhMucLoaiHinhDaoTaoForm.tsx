import { Grid } from '@mui/material';
import { ControlledCheckbox, ControlledTextField } from '@renderer/components/controlled-fields';
import { useFormContext } from 'react-hook-form';

export const DanhMucLoaiHinhDaoTaoForm = () => {
  const { control } = useFormContext();
  return (
    <Grid container rowSpacing={2} columnSpacing={4}>
      <Grid size={6}>
        <ControlledTextField
          control={control}
          name="maLoaiDaoTao"
          label="Mã loại đào tạo"
          required
        />
      </Grid>

      <Grid size={6}>
        <ControlledTextField
          control={control}
          name="tenLoaiDaoTao"
          label="Tên loại đào tạo"
          required
        />
      </Grid>

      <Grid size={6}>
        <ControlledTextField control={control} name="tenTiengAnh" label="Tên tiếng Anh" />
      </Grid>

      <Grid size={6}>
        <ControlledTextField control={control} name="noiDung" label="Nội dung" />
      </Grid>

      <Grid size={6}>
        <ControlledTextField control={control} name="ghiChu" label="Ghi chú" />
      </Grid>

      <Grid size={4}>
        <ControlledTextField
          control={control}
          labelWidth={150}
          type="number"
          name="soThuTu"
          label="Số thứ tự"
        />
      </Grid>

      <Grid size={2}>
        <ControlledCheckbox control={control} name="isVisible" label="Hiển thị" />
      </Grid>
    </Grid>
  );
};
