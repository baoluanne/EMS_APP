import { Box, Grid, Stack, Typography } from '@mui/material';
import {
  ControlledCheckbox,
  ControlledDatePicker,
  ControlledRadioGroup,
  ControlledTextField,
} from '@renderer/components/controlled-fields';
import {
  BacDaoTaoSelection,
  ChuyenNganhSelection,
  CoSoSelection,
  KhoaHocSelection,
  LoaiDaoTaoSelection,
  LopHocSelection,
  NganhSelection,
} from '@renderer/components/selections';
import { useFormContext } from 'react-hook-form';

export const DangKySinhVienChuyenTruongForm = () => {
  const { control } = useFormContext();

  return (
    <Stack direction="column" gap={2} alignItems="center" justifyContent="center" p={2}>
      <Grid container width={1} spacing={3}>
        <Grid size={6}>
          <ControlledTextField control={control} name="maHoSo" label="Mã hồ sơ*" />
        </Grid>
        <Grid size={6}>
          <ControlledTextField control={control} name="hoTen" label="Họ tên" />
        </Grid>
        <Grid size={6}>
          <ControlledDatePicker control={control} name="ngaySinh" label="Ngày sinh" />
        </Grid>
        <Grid size={6}>
          <Stack direction="row" gap={2} alignItems="center">
            <Typography fontSize={12}>Giới tính</Typography>
            <ControlledRadioGroup
              options={['Nam', 'Nữ'].map((value) => ({
                label: value,
                value,
              }))}
              control={control}
              name="gioiTinh"
            />
          </Stack>
        </Grid>
        <Grid size={6}>
          <CoSoSelection control={control} name="idCoSo" />
        </Grid>
        <Grid size={6}>
          <KhoaHocSelection control={control} name="idKhoaHoc" />
        </Grid>
        <Grid size={6}>
          <BacDaoTaoSelection control={control} name="idBacDaoTao" />
        </Grid>
        <Grid size={6}>
          <LoaiDaoTaoSelection control={control} name="idLoaiDaoTao" />
        </Grid>
        <Grid size={6}>
          <NganhSelection control={control} name="idNganh" />
        </Grid>
      </Grid>

      <Box width={1}>
        <Typography fontSize={14} fontWeight={600} mt={3}>
          Thông tin sinh viên
        </Typography>
      </Box>

      <Grid container width={1} spacing={3}>
        <Grid size={12}>
          <Stack direction="row" gap={2} alignItems="center">
            <ControlledTextField control={control} name="maSinhVien" label="Mã sinh viên*" />
            <ControlledCheckbox
              control={control}
              name="tuTaoMaSinhVien"
              label="Tự tạo mã sinh viên"
            />
          </Stack>
        </Grid>

        <Grid size={6}>
          <ChuyenNganhSelection control={control} name="idChuyenNganh" required />
        </Grid>

        <Grid size={6}>
          <LopHocSelection control={control} name="idLopHoc" required />
        </Grid>
      </Grid>
    </Stack>
  );
};
