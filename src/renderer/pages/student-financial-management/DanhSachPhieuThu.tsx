import { Stack } from '@mui/material';
import { FormProvider } from 'react-hook-form';
import { DataGridTable } from '@renderer/components/Table';
import { ActionsToolbar } from '@renderer/components/toolbars';
import { DeleteConfirmationModal, FormDetailsModal } from '@renderer/components/modals';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';
import { useState } from 'react';
import axios from 'axios';
import { env } from '@renderer/shared/configs/env.config';
import { toast } from 'react-toastify';

import { columns } from '@renderer/features/student-financial-management/thu-tien-sinh-vien/configs/table.config';
import { DanhSachPhieuThuForm } from '@renderer/features/student-financial-management/thu-tien-sinh-vien/components/DanhSachPhieuThuForm';
import { DanhSachPhieuThuFilter } from '@renderer/features/student-financial-management/thu-tien-sinh-vien/components/DanhSachPhieuThuFilter';
import {
  phieuThuSchema,
  PhieuThuSchema,
} from '@renderer/features/student-financial-management/thu-tien-sinh-vien/validation';
import type {
  PhieuThuSinhVien,
  CreatePhieuThuDto,
} from '@renderer/features/student-financial-management/thu-tien-sinh-vien/type';

const api = axios.create({ baseURL: env.API_ENDPOINT });

const defaultValues: Partial<PhieuThuSchema> = {
  sinhVienId: '',
  congNoId: '',
  soTien: 0,
  hinhThucThanhToan: 'ChuyenKhoan',
  ghiChu: '',
  xuatHoaDon: false,
  chiTiets: [],
};

export default function DanhSachPhieuThu() {
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);

  const {
    formMethods,
    data,
    isModalOpen,
    isRefetching,
    selectedRows,
    isDeleteOpenModal,
    onAdd,
    handleDeleteRecord,
    setIsDeleteOpenModal,
    handleCloseModal,
    tableConfig,
    columnVisibilityModel,
    mergeParams,
    handleRowSelectionModelChange,
    refetch,
  } = useCrudPaginationModal<PhieuThuSinhVien, PhieuThuSchema>({
    defaultValues,
    schema: phieuThuSchema,
    entity: 'PhieuThu',
  });

  const handleSave = async () => {
    const values = formMethods.getValues();

    if (!values.sinhVienId || !values.soTien || !values.hinhThucThanhToan) {
      toast.warning('Vui lòng nhập đầy đủ thông tin bắt buộc!');
      return;
    }

    try {
      const payload: CreatePhieuThuDto = {
        sinhVienId: values.sinhVienId,
        congNoId: values.congNoId || undefined,
        soTien: Number(values.soTien),
        hinhThucThanhToan: values.hinhThucThanhToan,
        ghiChu: values.ghiChu,
        xuatHoaDon: values.xuatHoaDon || false,
        chiTiets: [],
      };

      const token = localStorage.getItem('accessToken');

      await api.post('/PhieuThu/thanh-toan', payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success('Lập phiếu thu thành công!');

      refetch();
      handleCloseModal();
      setSelectedStudent(null);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Lỗi khi tạo phiếu thu');
    }
  };

  const rowsData = (data as any)?.Result ?? (data as any)?.result ?? [];

  return (
    <FormProvider {...formMethods}>
      <Stack className="w-full h-full p-2">
        <ActionsToolbar
          selectedRowIds={selectedRows}
          onAdd={() => {
            setSelectedStudent(null);
            onAdd();
          }}
          onDelete={() => setIsDeleteOpenModal(true)}
          onExport={(dataOption, columnOption) =>
            exportPaginationToExcel({
              entity: 'PhieuThuSinhVien',
              filteredData: rowsData,
              columns,
              options: { dataOption, columnOption },
              columnVisibilityModel,
              fileName: 'danh_sach_phieu_thu',
            })
          }
        />

        {isModalOpen && (
          <FormDetailsModal
            // FIX: Sử dụng selectedStudent vào title để fix lỗi unused variable
            title={
              selectedStudent?.id ? 'Lập phiếu thu (Đã chọn SV)' : 'Lập phiếu thu tiền sinh viên'
            }
            onClose={handleCloseModal}
            onSave={handleSave}
          >
            <DanhSachPhieuThuForm setSelectedStudent={setSelectedStudent} />
          </FormDetailsModal>
        )}

        {isDeleteOpenModal && (
          <DeleteConfirmationModal
            onClose={() => setIsDeleteOpenModal(false)}
            onDelete={handleDeleteRecord}
          />
        )}

        <DanhSachPhieuThuFilter onApply={mergeParams} />

        <DataGridTable
          columns={columns}
          rows={rowsData}
          checkboxSelection
          loading={isRefetching}
          onRowClick={() => {}}
          onRowSelectionModelChange={handleRowSelectionModelChange}
          rowSelectionModel={selectedRows}
          height="calc(100% - 85px)"
          {...tableConfig}
        />
      </Stack>
    </FormProvider>
  );
}
