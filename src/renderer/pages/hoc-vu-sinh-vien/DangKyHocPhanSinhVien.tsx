import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import { Button, Grid, Stack } from '@mui/material';
import InfoSection from '@renderer/components/InfoSection';
import { ThongTinSinhVien } from '@renderer/components/ThongTinSinhVien';
import {
  DangKyHocPhanSinhVienForm,
  LopHocPhanChuaDangKy,
  LopHocPhanDaDangKy,
  ThongTinChiTietLopHocPhan,
} from '@renderer/features/hoc-vu-sinh-vien/dang-ky-hoc-phan-sinh-vien';
import { FormProvider, useForm } from 'react-hook-form';

export default function DangKyHocPhanSinhVien() {
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
        <FormProvider {...formMethods}>
          <ThongTinSinhVien control={formMethods.control} reset={formMethods.reset} />

          <Grid size={12}>
            <InfoSection
              flexDirection="row"
              justifyContent="space-between"
              alignItems="stretch"
              gap={1}
            >
              <Stack
                sx={{
                  flex: 1,
                  minWidth: 0,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                }}
                spacing={2}
              >
                <DangKyHocPhanSinhVienForm />

                <LopHocPhanChuaDangKy />
              </Stack>
              <Stack
                spacing={1}
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                sx={{ flexShrink: 0 }}
              >
                <Button
                  variant="contained"
                  sx={{ borderColor: '#263ca6' }}
                  type="button"
                  size="small"
                >
                  <ArrowRight />
                </Button>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: '#263ca6' }}
                  type="button"
                  size="small"
                >
                  <ArrowLeft />
                </Button>
              </Stack>
              <Stack
                sx={{
                  flex: 1,
                  minWidth: 0,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                }}
                spacing={2}
              >
                <LopHocPhanDaDangKy />

                <ThongTinChiTietLopHocPhan />
              </Stack>
            </InfoSection>
          </Grid>
        </FormProvider>
      </form>
    </Stack>
  );
}
