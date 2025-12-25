import { Button, Stack, Typography } from '@mui/material';
import { ControlledCheckbox, ControlledTextField } from '@renderer/components/controlled-fields';
import { DataGridTable } from '@renderer/components/Table';
import { useForm } from 'react-hook-form';
import { columnsLopHocPhanChuaDangKy } from '../configs';
import { Search } from '@mui/icons-material';

export const LopHocPhanChuaDangKy = () => {
  const { reset, control } = useForm();

  return (
    <Stack spacing={1}>
      <Stack spacing={4} direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="subtitle1" fontWeight={700}>
          Lớp học phần chưa đăng ký
        </Typography>

        <ControlledCheckbox
          control={control}
          name="khongTrungLich"
          label="Không trùng lịch"
          size="small"
        />
      </Stack>

      <Stack spacing={1} direction="row" alignItems="center" justifyContent="space-between">
        <ControlledTextField control={control} name="maLHP" label="Mã LHP" />

        <Button variant="contained" size="small" startIcon={<Search />}>
          Tìm
        </Button>
      </Stack>

      <DataGridTable
        columns={columnsLopHocPhanChuaDangKy}
        rows={[]}
        checkboxSelection={false}
        loading={false}
        onRowClick={(params) => reset(params.row)}
        height={'300px'}
      />
    </Stack>
  );
};
