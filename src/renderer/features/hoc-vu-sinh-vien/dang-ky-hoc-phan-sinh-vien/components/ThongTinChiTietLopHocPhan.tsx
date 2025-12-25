import { Button, Grid, Stack, Typography } from '@mui/material';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { NhomTHSelection } from '@renderer/components/selections';
import { DataGridTable } from '@renderer/components/Table';
import { useFormContext } from 'react-hook-form';
import { columnsSchedule } from '../configs';

export const ThongTinChiTietLopHocPhan = () => {
  const { control } = useFormContext();

  return (
    <Stack spacing={1}>
      <Stack flexDirection="row" alignItems="center" justifyContent="space-between" gap={1}>
        <Typography variant="subtitle1" fontWeight={700}>
          Thông tin chi tiết lớp học phần
        </Typography>
        <Button variant="contained" size="small">
          Xem trùng lịch
        </Button>
      </Stack>
      <Grid container spacing={1}>
        <Grid size={4}>
          <Stack spacing={1}>
            <ControlledTextField control={control} name="maLHP" label="Mã LHP" />

            <ControlledTextField control={control} name="coSo" label="Cơ sở" />

            <ControlledTextField control={control} name="tinhTrang" label="Tình trạng" />

            <ControlledTextField control={control} name="siSo" label="Sĩ số" />

            <NhomTHSelection control={control} name="nhomTH" label="Nhóm TH" disabled />
          </Stack>
        </Grid>

        <Grid size={8}>
          <DataGridTable
            columns={columnsSchedule}
            rows={[]}
            checkboxSelection={false}
            loading={false}
            height={'200px'}
          />
        </Grid>
      </Grid>
    </Stack>
  );
};
