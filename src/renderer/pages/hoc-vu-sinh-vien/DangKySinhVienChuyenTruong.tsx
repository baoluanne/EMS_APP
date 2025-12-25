import { zodResolver } from '@hookform/resolvers/zod';
import { Save } from '@mui/icons-material';
import { Button, Stack } from '@mui/material';
import {
  DangKySinhVienChuyenTruongForm,
  DangKySinhVienChuyenTruongSchema,
  defaultDangKySinhVienChuyenTruongValues,
} from '@renderer/features/hoc-vu-sinh-vien/dang-ky-sinh-vien-chuyen-truong';
import { useCrud } from '@renderer/shared/hooks';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function DangKySinhVienChuyenTruong() {
  const { onSubmit } = useCrud({
    entity: 'ChuyenTruong',
  });

  const formMethods = useForm({
    defaultValues: defaultDangKySinhVienChuyenTruongValues,
    resolver: zodResolver(DangKySinhVienChuyenTruongSchema),
  });

  const onSave = formMethods.handleSubmit(
    async (values) => {
      const payload = values;
      await onSubmit(payload, true);
      toast.success('Thêm mới thành công');
    },
    (error) => console.log('Error ', error),
  );

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={onSave}>
        <Stack flexDirection="row" flexWrap="wrap" alignItems="center" p={1}>
          <Button variant="text" size="small" startIcon={<Save />} type="submit">
            Lưu
          </Button>
        </Stack>
        <DangKySinhVienChuyenTruongForm />
      </form>
    </FormProvider>
  );
}
