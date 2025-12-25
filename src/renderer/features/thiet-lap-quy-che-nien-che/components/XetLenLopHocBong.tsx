import { Stack } from '@mui/material';
import { DieuKienLenLopTienLopForm, DieuKienXetThoiHocForm, TotNghiepForm } from './forms';
import { HocBongSection } from './HocBongSection';

export const XetLenLopHocBong = () => {
  return (
    <Stack gap={2.5}>
      <DieuKienLenLopTienLopForm />
      <DieuKienXetThoiHocForm />
      <TotNghiepForm />
      <HocBongSection />
    </Stack>
  );
};
