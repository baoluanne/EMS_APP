import { Alert, Stack } from '@mui/material';
import {
  DanhSachSinhVienDataGridTable,
  DanhSachSinhVienDataGridTableHandle,
} from '@renderer/features/hoc-vu-sinh-vien/chuyen-lop/components/DanhSachSinhVienDataGridTable';
import { FormProvider, useForm } from 'react-hook-form';
import {
  ChuyenLopSchema,
  columns,
  TransferActions,
} from '@renderer/features/hoc-vu-sinh-vien/chuyen-lop';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { PhanLoaiChuyenLop } from '@renderer/shared/enums';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ChuyenLopPayload,
  LoaiChuyenLop,
} from '@renderer/features/hoc-vu-sinh-vien/chuyen-lop/types';
import { useInsertMutation } from '@renderer/shared/mutations';
import { useRef, useState } from 'react';
import { FormDetailsModal } from '@renderer/components/modals';
import { useDisclosure } from '@renderer/shared/hooks';
import { SinhVien } from '@renderer/shared/types';
import { DataGridTable } from '@renderer/components/Table';

export default function ChuyenLop() {
  const lopCuRef = useRef<DanhSachSinhVienDataGridTableHandle>(null);
  const lopMoiRef = useRef<DanhSachSinhVienDataGridTableHandle>(null);
  const { isOpen, toggle } = useDisclosure();
  const [payload, setPayload] = useState<ChuyenLopPayload>();
  const [loaiLopCuSangLopMoi, setLopCuSangLopMoi] = useState<boolean>(false);
  const { mutateAsync, isPending } = useInsertMutation('ChuyenLop/chuyen-lop');
  const formMethods = useForm<any>({
    defaultValues: {
      lopCu: undefined,
      lopMoi: undefined,
      loaiChuyenLop: undefined,
      sinhVienLopCu: [],
      sinhVienLopMoi: [],
    },
    resolver: zodResolver(ChuyenLopSchema),
  });
  const handleSinhVienLopCuChanged = (rows: SinhVien[]) => {
    formMethods.setValue('sinhVienLopCu', rows);
  };

  const handleSinhVienLopMoiChanged = (rows: SinhVien[]) => {
    formMethods.setValue('sinhVienLopMoi', rows);
  };

  const handleConfirmModal = () => {
    const { lopCu, lopMoi, sinhVienLopCu, sinhVienLopMoi, loaiChuyenLop } = formMethods.getValues();
    const lopCuSangLopMoi = loaiChuyenLop === LoaiChuyenLop.LopCuSangLopMoi;
    const idDanhSachSinhVien = (lopCuSangLopMoi ? sinhVienLopCu : sinhVienLopMoi).map(
      (item) => item.id,
    );
    setPayload({
      idLopCu: lopCuSangLopMoi ? lopCu.id : lopMoi.id,
      idLopMoi: lopCuSangLopMoi ? lopMoi.id : lopCu.id,
      idDanhSachSinhVien,
      phanLoaiChuyenLop: PhanLoaiChuyenLop.ChuyenLopCungNganh,
    });
    setLopCuSangLopMoi(lopCuSangLopMoi);
    toggle();
  };

  const handleChuyenLop = async () => {
    try {
      await mutateAsync(payload!);
      lopCuRef.current?.refresh(loaiLopCuSangLopMoi ? payload?.idLopCu : payload?.idLopMoi);
      lopMoiRef.current?.refresh(loaiLopCuSangLopMoi ? payload?.idLopCu : payload?.idLopMoi);
      toast.success('Chuyển lớp thành công');
      toggle();
    } catch (error) {
      console.error(error);
      toast.error('Có lỗi xảy ra, không thể chuyển lớp');
    }
  };
  const handleError = (errors) => {
    toast.error(errors[z.ZodIssueCode.custom]?.message as string);
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
        <Stack className="w-full h-full mt-2 gap-x-2" direction="row">
          <DanhSachSinhVienDataGridTable
            name={'lopCu'}
            label={'Lớp cũ'}
            control={formMethods.control}
            onSelectedRowsChanged={handleSinhVienLopCuChanged}
            ref={lopCuRef}
          />
          <Stack
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <TransferActions onTransferStudents={handleConfirmModal}></TransferActions>
          </Stack>
          <DanhSachSinhVienDataGridTable
            name={'lopMoi'}
            label={'Lớp mới'}
            control={formMethods.control}
            onSelectedRowsChanged={handleSinhVienLopMoiChanged}
            ref={lopMoiRef}
          />
          {isOpen && (
            <FormDetailsModal
              title={'Xác nhận chuyển lớp'}
              saveTitle={'Xác nhận'}
              isRefetching={isPending}
              onClose={toggle}
              onSave={formMethods.handleSubmit(handleChuyenLop, handleError)}
            >
              <Alert severity={'info'}>
                Xác nhận chuyển <strong>{payload?.idDanhSachSinhVien.length}</strong> sinh viên từ
                lớp
                <strong className={'px-1'}>
                  {formMethods.getValues(loaiLopCuSangLopMoi ? 'lopCu' : 'lopMoi').tenLop}
                </strong>
                sang lớp
                <strong className={'px-1'}>
                  {formMethods.getValues(loaiLopCuSangLopMoi ? 'lopMoi' : 'lopCu').tenLop}
                </strong>
              </Alert>
              <DataGridTable
                columns={columns}
                rows={formMethods.getValues(
                  loaiLopCuSangLopMoi ? 'sinhVienLopCu' : 'sinhVienLopMoi',
                )}
                checkboxSelection={false}
                height={'calc(100% - 85px)'}
              />
            </FormDetailsModal>
          )}
        </Stack>
      </Stack>
    </FormProvider>
  );
}
