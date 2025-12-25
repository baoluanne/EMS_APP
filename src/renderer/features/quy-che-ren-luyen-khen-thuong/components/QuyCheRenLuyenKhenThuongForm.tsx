import { Grid, Stack } from '@mui/material';
import { ControlledCheckbox, ControlledTextField } from '@renderer/components/controlled-fields';
import { LoaiKhenThuongSelection } from '@renderer/components/selections';
import { useFormContext } from 'react-hook-form';

export const QuyCheRenLuyenKhenThuongForm = () => {
  const { control } = useFormContext();
  return (
    <Stack gap={1}>
      <Stack direction="row" gap={4}>
        <ControlledTextField control={control} name="maKhenThuong" label="Mã khen thưởng" required />
        <ControlledTextField control={control} name="tenKhenThuong" label="Tên khen thưởng" required />
        <ControlledTextField control={control} name="diemCong" label="Điểm cộng" type="number" />
      </Stack>
      <Stack direction="row" gap={4}>
        <Grid flex={1}>
          <LoaiKhenThuongSelection control={control} name="idLoaiKhenThuong" />
        </Grid>
        <ControlledTextField control={control} name="noiDung" label="Nội dung" />
        <ControlledTextField
          control={control}
          name="diemCongToiDa"
          label="Điểm cộng tối đa"
          type="number"
        />
      </Stack>

      <Stack direction="row" gap={4}>
        <ControlledTextField control={control} name="ghiChu" label="Ghi Chú" />
        <ControlledCheckbox control={control} name="isViPhamNoiTru" label="Vi Phạm Nội Chú" />
      </Stack>
    </Stack>
  );
};
