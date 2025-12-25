import { Stack, Typography } from '@mui/material';
import { DataGridTable } from '@renderer/components/Table';
import { useFormContext } from 'react-hook-form';
import { columnsLopHocPhanDaDangKy } from '../configs';

export const LopHocPhanDaDangKy = () => {
  const { reset } = useFormContext();

  return (
    <Stack spacing={1}>
      <Typography variant="subtitle1" fontWeight={700}>
        Lớp học phần đã đăng ký
      </Typography>

      <DataGridTable
        columns={columnsLopHocPhanDaDangKy}
        rows={[]}
        checkboxSelection={false}
        loading={false}
        onRowClick={(params) => reset(params.row)}
        height={'300px'}
      />
    </Stack>
  );
};
