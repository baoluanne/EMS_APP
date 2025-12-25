import { Button, ButtonGroup, Stack } from '@mui/material';
import {
  DanhSachSinhVienDataGridTable,
  PhanChuyenNganhFilter,
} from '@renderer/features/hoc-vu-sinh-vien/phan-chuyen-nganh';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { FormProvider, useForm } from 'react-hook-form';

export default function PhanChuyenNganh() {
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
        <PhanChuyenNganhFilter onApply={(value) => console.log(value)} />
        <Stack className="w-full h-full gap-x-2 mt-2" direction="row">
          <DanhSachSinhVienDataGridTable
            name={'lopCu'}
            label={'Lớp cũ'}
            control={formMethods.control}
            onSelectedRowsChanged={console.log}
          />
          <Stack
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ButtonGroup orientation="vertical">
              <Button>
                <ArrowBackIcon />
              </Button>
              <Button>
                <ArrowForwardIcon />
              </Button>
            </ButtonGroup>
          </Stack>
          <DanhSachSinhVienDataGridTable
            name={'lopMoi'}
            label={'Lớp mới'}
            control={formMethods.control}
            onSelectedRowsChanged={console.log}
          />
        </Stack>
      </Stack>
    </FormProvider>
  );
}
