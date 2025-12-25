import { Save } from '@mui/icons-material';
import { Button, Stack } from '@mui/material';
import InfoSection from '@renderer/components/InfoSection';
import { DataGridTable } from '@renderer/components/Table';
import { ThongTinSinhVien } from '@renderer/components/ThongTinSinhVien';
import {
  columnsLopHocPhanDaDangKy,
  DangKyHocCaiThienForm,
} from '@renderer/features/hoc-vu-sinh-vien/dang-ky-hoc-cai-thien';
import { FormProvider, useForm } from 'react-hook-form';

export default function DangKyHocCaiThien() {
  const formMethods = useForm();

  const onSubmit = (data: any) => {
    console.log('Form submitted:', data);
  };

  return (
    <Stack
      className="w-full h-full p-2"
      style={{
        height: '100%',
        width: '100%',
        overflow: 'auto',
        position: 'relative',
        borderRadius: '0px',
      }}
      gap={1}
    >
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <Stack flexDirection="row" flexWrap="wrap" alignItems="center" p={1}>
          <Button variant="text" size="small" startIcon={<Save />} type="submit">
            Lưu
          </Button>
        </Stack>

        <ThongTinSinhVien control={formMethods.control} reset={formMethods.reset} />
        <FormProvider {...formMethods}>
          <DangKyHocCaiThienForm />
        </FormProvider>

        <InfoSection title="Danh sách lớp học phần đã đăng ký trong đợt này">
          <DataGridTable
            columns={columnsLopHocPhanDaDangKy}
            rows={[]}
            checkboxSelection={false}
            loading={false}
            onRowClick={(params) => formMethods.reset(params.row)}
            height={'calc(100% - 85px)'}
          />
        </InfoSection>
      </form>
    </Stack>
  );
}
