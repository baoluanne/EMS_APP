import { Grid, Stack } from '@mui/material';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import InfoSection from '@renderer/components/InfoSection';
import { NhomTHSelection } from '@renderer/components/selections';
import { DataGridTable } from '@renderer/components/Table';
import { useFormContext } from 'react-hook-form';
import { columnsSchedule } from '../configs';

export const ThongTinChiTietLopHocPhan = () => {
  const { control } = useFormContext();
  return (
    <InfoSection title="Thông tin chi tiết lớp học phần">
      <Grid container spacing={2}>
        <Grid size={4}>
          <Stack spacing={1}>
            <ControlledTextField control={control} name="maLHP" label="Mã LHP" />

            <ControlledTextField control={control} name="coSoLHP" label="Cơ sở" />

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
            height={'calc(100% - 85px)'}
          />
        </Grid>
      </Grid>
    </InfoSection>
  );
};
