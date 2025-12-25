import { Search } from '@mui/icons-material';
import { Button, Grid, Stack, Typography } from '@mui/material';
import { ControlledDatePicker, ControlledTextField } from '@renderer/components/controlled-fields';
import { DataGridTable } from '@renderer/components/Table';
import { useForm } from 'react-hook-form';
import { columnsDanhSachSinhVienChuaDangKy } from '../configs';
import { DieuKienLamKhoaLuanSelection } from '@renderer/components/selections';

export const DanhSachSinhVienChuaDangKy = () => {
  const { control } = useForm();
  return (
    <Stack spacing={1}>
      <Stack>
        <Typography variant="subtitle1" fontWeight={700} mb={2}>
          Tìm kiếm sinh viên chưa đăng ký
        </Typography>

        <Grid container spacing={1}>
          <Grid size={6}>
            <ControlledTextField control={control} name="maSinhVien" label="Mã sinh viên" />
          </Grid>

          <Grid size={6}>
            <ControlledTextField control={control} name="hoTen" label="Họ tên" />
          </Grid>

          <Grid size={6}>
            <ControlledDatePicker
              control={control}
              name="nhapHocDenNgay"
              label="Nhập học đến ngày"
            />
          </Grid>

          <Grid size={6}>
            <DieuKienLamKhoaLuanSelection control={control} name="dieuKienLamKhoaLuan" />
          </Grid>
        </Grid>
      </Stack>
      <Stack flexDirection="row" alignItems="center" justifyContent="space-between" gap={1}>
        <Typography variant="subtitle1" fontWeight={700}>
          Danh sách sinh viên chưa đăng ký
        </Typography>
        <Button variant="contained" size="small" startIcon={<Search />}>
          Tìm
        </Button>
      </Stack>

      <DataGridTable
        columns={columnsDanhSachSinhVienChuaDangKy}
        rows={[]}
        checkboxSelection={true}
        loading={false}
        height={'calc(100% - 85px)'}
      />
    </Stack>
  );
};
