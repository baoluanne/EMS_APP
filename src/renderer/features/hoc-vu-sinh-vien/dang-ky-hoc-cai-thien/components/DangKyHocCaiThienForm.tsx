import { Grid, Typography } from '@mui/material';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import InfoSection from '@renderer/components/InfoSection';
import { MonHocPhanSelection } from '@renderer/components/selections';
import { DotDangKySelection } from '@renderer/components/selections/DotDangKySelection';
import { LopHocPhanSelection } from '@renderer/components/selections/TimLopHocPhan';
import { DataGridTable } from '@renderer/components/Table';
import { useFormContext } from 'react-hook-form';
import { columnsSchedule } from '../configs';

export const DangKyHocCaiThienForm = () => {
  const { control } = useFormContext();
  return (
    <InfoSection>
      <Grid container spacing={3}>
        <Grid size={4}>
          <Typography variant="subtitle1" fontWeight={700} mt={0} mb={2}>
            Môn học phần cải thiện
          </Typography>

          <Grid container spacing={2}>
            <Grid size={12}>
              <DotDangKySelection control={control} name="idDotDangKy" />
            </Grid>

            <Grid size={12}>
              <MonHocPhanSelection control={control} name="idMonHocPhan" />
            </Grid>
            <Grid size={12}>
              <LopHocPhanSelection control={control} name="idLopHocPhan" />
            </Grid>

            <Grid size={12}>
              <ControlledTextField
                control={control}
                name="diemDaDat"
                label="Điểm đã đạt"
                type="number"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid size={8}>
          <Grid container spacing={2}>
            <Grid size={6}>
              <Typography variant="subtitle1" fontWeight={700} mt={0} mb={2}>
                Môn học phần cải thiện
              </Typography>

              <Grid container spacing={2}>
                <Grid size={12}>
                  <ControlledTextField control={control} name="maLHP" label="Mã LHP" />
                </Grid>

                <Grid size={12}>
                  <ControlledTextField control={control} name="coSo" label="Cơ sở" />
                </Grid>

                <Grid size={12}>
                  <ControlledTextField control={control} name="tinhTrang" label="Tình trạng" />
                </Grid>

                <Grid size={6}>
                  <ControlledTextField control={control} name="siSo" label="Sĩ số" />
                </Grid>

                <Grid size={6}>
                  <ControlledTextField control={control} name="siSoDangKy" label="Sĩ số đăng ký" />
                </Grid>

                <Grid size={12}>
                  <ControlledTextField control={control} name="nhomTH" label="Nhóm TH" />
                </Grid>
              </Grid>
            </Grid>
            <Grid size={6}>
              <DataGridTable
                columns={columnsSchedule}
                rows={[]}
                checkboxSelection={false}
                loading={false}
                onRowClick={() => {}}
                height={'calc(100% - 85px)'}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </InfoSection>
  );
};
