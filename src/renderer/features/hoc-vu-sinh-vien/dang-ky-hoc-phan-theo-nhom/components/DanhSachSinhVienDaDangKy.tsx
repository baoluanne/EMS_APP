import { Search } from '@mui/icons-material';
import { Button, Grid, Stack, Typography } from '@mui/material';
import { ControlledDatePicker, ControlledTextField } from '@renderer/components/controlled-fields';
import { DataGridTable } from '@renderer/components/Table';
import { useFormContext } from 'react-hook-form';
import { columnsDanhSachSinhVienDaDangKy } from '../configs';

export const DanhSachSinhVienDaDangKy = () => {
  const { control, reset } = useFormContext();
  return (
    <Stack spacing={1}>
      <Typography variant="subtitle1" fontWeight={700}>
        Tìm kiếm sinh viên chưa đăng ký
      </Typography>
      <Grid container spacing={1}>
        <Grid size={4}>
          <ControlledTextField control={control} name="maSinhVienTimKiem" label="Mã sinh viên" />
        </Grid>

        <Grid size={8}>
          <ControlledDatePicker control={control} name="nhapHocDenNgay" label="Nhập học đến ngày" />
        </Grid>

        <Grid size={12}>
          <ControlledTextField control={control} name="hoTen" label="Họ tên" />
        </Grid>
      </Grid>
      <Stack flexDirection="row" alignItems="center" justifyContent="space-between" gap={1}>
        <Typography variant="subtitle1" fontWeight={700}>
          Danh sách sinh viên đã đăng ký lớp học phần
        </Typography>
        <Button variant="contained" size="small" startIcon={<Search />}>
          Tìm
        </Button>
      </Stack>
      <DataGridTable
        columns={columnsDanhSachSinhVienDaDangKy}
        rows={[]}
        checkboxSelection={false}
        loading={false}
        onRowClick={(params) => reset(params.row)}
        height={'calc(100% - 85px)'}
      />
    </Stack>
  );
};
