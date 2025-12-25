import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import { Box, Button, Grid, Stack } from '@mui/material';
import InfoSection from '@renderer/components/InfoSection';
import {
  DangKyHocPhanTheoNhomForm,
  DanhSachSinhVienChuaDangKy,
  DanhSachSinhVienDaDangKy,
  ThongTinChiTietLopHocPhan,
} from '@renderer/features/hoc-vu-sinh-vien/dang-ky-hoc-phan-theo-nhom';
import { FormProvider, useForm } from 'react-hook-form';

export default function DangKyHocPhanTheoNhom() {
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
          <Grid container spacing={1}>
            <Grid size={6}>
              <DangKyHocPhanTheoNhomForm />
            </Grid>

            <Grid size={6}>
              <ThongTinChiTietLopHocPhan />
            </Grid>

            <Grid size={12}>
              <InfoSection
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                gap={1}
              >
                <Box sx={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
                  <DanhSachSinhVienChuaDangKy />
                </Box>
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
                <Box sx={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
                  <DanhSachSinhVienDaDangKy />
                </Box>
              </InfoSection>
            </Grid>
          </Grid>
        </FormProvider>
      </form>
    </Stack>
  );
}
