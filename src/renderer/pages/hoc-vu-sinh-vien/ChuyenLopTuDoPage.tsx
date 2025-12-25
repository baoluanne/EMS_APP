import { Save } from '@mui/icons-material';
import { Button, Stack } from '@mui/material';
import { ActionsToolbar } from '@renderer/components/toolbars';
import {
  ChuyenLopTuDo,
  ChuyenLopTuDoThongTinSinhVienFormHandle,
} from '@renderer/features/hoc-vu-sinh-vien/chuyen-lop-tu-do';
import ChuyenLopTuDoDataGridTables from '@renderer/features/hoc-vu-sinh-vien/chuyen-lop-tu-do/components/ChuyenLopTuDoDataGridTables';
import ChuyenLopTuDoThongTinSinhVienForm from '@renderer/features/hoc-vu-sinh-vien/chuyen-lop-tu-do/components/ChuyenLopTuDoThongTinSinhVienForm';
import { FormProvider, useForm } from 'react-hook-form';
import { BaseResponse, SinhVien } from '@renderer/shared/types';
import { toast } from 'react-toastify';
import { useInsertMutation } from '@renderer/shared/mutations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef } from 'react';

export default function ChuyenLopTuDoPage() {
  const thongTinSinhVienFormRef = useRef<ChuyenLopTuDoThongTinSinhVienFormHandle>(null);
  const { mutateAsync, isPending } = useInsertMutation<BaseResponse<string>>(
    'ChuyenLop/chuyen-lop-tu-do',
  );
  const formMethods = useForm<any>({
    defaultValues: {},
    resolver: zodResolver(ChuyenLopTuDo),
  });
  const handleSubmit = async ({ sinhVien, lopHocMoi, phanLoaiChuyenLop, idHocPhanCuDaChon }) => {
    const payload = {
      idSinhVien: sinhVien.id,
      idLopCu: sinhVien.lopHoc.id,
      idLopHocMoi: lopHocMoi.id,
      idHocPhanCu: idHocPhanCuDaChon,
      phanLoaiChuyenLop,
    };
    try {
      const result = await mutateAsync(payload!);
      if (result.isSuccess) {
        formMethods.reset({});
        thongTinSinhVienFormRef.current!.refresh();
        toast.success('Chuyển lớp thành công');
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Có lỗi xảy ra, không thể chuyển lớp');
    }
  };
  const handleError = (errors) => {
    if (errors.sinhVien) {
      toast.error(errors.sinhVien.message);
      return;
    }
    if (errors.custom) {
      toast.error(errors.custom.message);
    }
  };
  const handleSubmitThongTinSinhVien = (sinhvien: SinhVien) => {
    formMethods.setValue('sinhVien', sinhvien);
  };

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
        <ActionsToolbar
          customStartActions={
            <Button
              variant="text"
              size="small"
              startIcon={<Save />}
              disabled={isPending}
              onClick={formMethods.handleSubmit(handleSubmit, handleError)}
            >
              Lưu
            </Button>
          }
        />
        <ChuyenLopTuDoThongTinSinhVienForm
          ref={thongTinSinhVienFormRef}
          onSubmit={handleSubmitThongTinSinhVien}
        />
        <ChuyenLopTuDoDataGridTables />
      </Stack>
    </FormProvider>
  );
}
