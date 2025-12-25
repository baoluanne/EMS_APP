import { Grid } from '@mui/material';
import { ControlledCheckbox, ControlledTextField } from '@renderer/components/controlled-fields';
import { ControlledSelect } from '@renderer/components/controlled-fields/ControlledSelect';
import { LoaiKhoanThuSelection } from '@renderer/components/selections/LoaiKhoanThuSelection';
import { DonViTinhOptions } from '@renderer/shared/enums/donViTinh.enum';
import { useFormContext } from 'react-hook-form';

export const KhoanThuTuDoForm = () => {
  const { control } = useFormContext();
  return (
    <Grid container rowSpacing={2} columnSpacing={2}>
      <Grid size={6}>
        <ControlledTextField control={control} name="maKhoanThu" label="Mã khoản thu" required />
      </Grid>

      <Grid size={6}>
        <ControlledTextField control={control} name="tenKhoanThu" label="Tên khoản thu" required />
      </Grid>

      <Grid size={6}>
        <ControlledTextField control={control} name="soTien" label="Số tiền" />
      </Grid>

      <Grid size={6}>
        <ControlledTextField control={control} name="stt" label="Số thứ tự" />
      </Grid>

      <Grid size={12}>
        <LoaiKhoanThuSelection control={control} required name="idLoaiKhoanThu" />
      </Grid>

      <Grid size={4}>
        <ControlledTextField control={control} name="thueVAT" label="Thuế giá trị gia tăng" />
      </Grid>

      <Grid size={4}>
        <ControlledCheckbox control={control} name="gomThueVAT" label="Gồm thuế giá trị gia tăng" />
      </Grid>

      <Grid size={4}>
        <ControlledCheckbox control={control} name="isVisible" label="Hiển thị" />
      </Grid>

      <Grid size={12}>
        <ControlledSelect
          control={control}
          name="donViTinh"
          label="Đơn vị tính"
          options={DonViTinhOptions}
        />
      </Grid>

      <Grid size={12}>
        <ControlledTextField
          control={control}
          name="ghiChu"
          label="Ghi chú"
          multiline
          minRows={2}
        />
      </Grid>
    </Grid>
  );
};
