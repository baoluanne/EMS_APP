import { Grid, Stack } from '@mui/material';
import { ControlledCheckbox } from '@renderer/components/controlled-fields';
import InfoSection from '@renderer/components/InfoSection';
import {
  CoSoSelection,
  KhoaHocSelection,
  KhoaSelection,
  LopHocSelection,
  MonHocPhanSelection,
  NhomSelection,
} from '@renderer/components/selections';
import { DotDangKySelection } from '@renderer/components/selections/DotDangKySelection';
import { LopHocPhanSelection } from '@renderer/components/selections/TimLopHocPhan';
import { useFormContext } from 'react-hook-form';

export const DangKyHocPhanTheoNhomForm = () => {
  const { control } = useFormContext();
  return (
    <InfoSection title="Điều kiện tìm sinh viên chưa đăng ký">
      <Stack spacing={1}>
        <CoSoSelection control={control} name="idCoSo" label="Cơ sở" required />

        <KhoaSelection control={control} name="idKhoa" label="Khoa" />

        <KhoaHocSelection control={control} name="idKhoaHoc" required />

        <Grid container spacing={1}>
          <Grid size={6}>
            <LopHocSelection control={control} name="idLopHoc" label="Lớp học" required />
          </Grid>

          <Grid size={6}>
            <NhomSelection control={control} name="idNhom" label="Nhóm" />
          </Grid>
        </Grid>

        <DotDangKySelection control={control} name="idDotDangKy" required />

        <Grid container spacing={1}>
          <Grid size={8}>
            <MonHocPhanSelection control={control} name="idMonHocPhan" required />
          </Grid>

          <Grid size={4}>
            <ControlledCheckbox control={control} name="coMoLopHP" label="Có mở lớp HP" />
          </Grid>
        </Grid>

        <LopHocPhanSelection control={control} name="idLopHocPhan" required />
      </Stack>
    </InfoSection>
  );
};
