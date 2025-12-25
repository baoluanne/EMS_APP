import { Stack } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import {
  DanhSachLopHocPhanDaDangKyGridTable,
  HuyDangKyHocPhanSinhVienForm,
} from '@renderer/features/hoc-vu-sinh-vien/huy-dang-ky-hoc-phan-sinh-vien';

export default function HuyDangKyHocPhanSinhVien() {
  const formMethods = useForm<any>({
    defaultValues: {},
  });

  return (
    <FormProvider {...formMethods}>
      <Stack
        className="w-full h-full p-2"
        style={{
          height: '100%',
          width: '100%',
          overflow: 'auto',
          position: 'relative',
          borderRadius: '0px',
        }}
      >
        <HuyDangKyHocPhanSinhVienForm />
        <DanhSachLopHocPhanDaDangKyGridTable />
      </Stack>
    </FormProvider>
  );
}
