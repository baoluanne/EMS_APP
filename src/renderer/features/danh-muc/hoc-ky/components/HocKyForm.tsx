import Grid from '@mui/material/Grid';
import { ControlledCheckbox, ControlledDatePicker, ControlledTextField } from '@renderer/components/controlled-fields';
import { NamHocSelection } from '@renderer/components/selections';
import { useFormContext } from 'react-hook-form';

export const HocKyForm = () => {
  const { control } = useFormContext();

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 6 }}>
        <NamHocSelection control={control} name="idNamHoc" required disabled />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <ControlledTextField control={control} name="tenDot" label="Tên đợt" required />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <ControlledTextField
          control={control}
          name="soThuTu"
          label="Số thứ tự"
          type="number"
          required
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <ControlledTextField control={control} name="soTuan" label="Số tuần" type="number" />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <ControlledTextField control={control} name="heSo" label="Hệ số" type="number" />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <ControlledTextField control={control} name="namHanhChinh" label="Năm hành chính" />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <ControlledTextField control={control} name="tuThang" label="Từ tháng" type="number" />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <ControlledTextField control={control} name="denThang" label="Đến tháng" type="number" />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <ControlledDatePicker control={control} name="tuNgay" label="Từ ngày" />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <ControlledDatePicker control={control} name="denNgay" label="Đến ngày" />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <ControlledTextField control={control} name="tenDayDu" label="Tên đầy đủ" />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <ControlledTextField control={control} name="tenTiengAnh" label="Tên tiếng Anh" />
      </Grid>

      <Grid size={{ xs: 10 }}>
        <ControlledTextField control={control} name="ghiChu" label="Ghi chú" />
      </Grid>
      <Grid size={{ xs: 12, md: 2 }} sx={{ display: 'flex', alignItems: 'center' }}>
        <ControlledCheckbox control={control} name="isVisible" label="Hiển thị" />
      </Grid>

      <Grid size={{ xs: 12, md: 3 }}>
        <ControlledCheckbox control={control} name="isActive" label="Kích hoạt" />
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <ControlledCheckbox control={control} name="isDKHP" label="Đăng ký học phần" />
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <ControlledCheckbox control={control} name="isDKNTTT" label="Đăng ký NTTT" />
      </Grid>
    </Grid>
  );
};
