// DanhSachCongNo.tsx – THEO ĐÚNG MẪU DANH SÁCH LỚP HỌC
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

import { columns } from '@renderer/features/student-financial-management/danh-sach-cong-no/configs/table.config';
import { DanhSachCongNoForm } from '@renderer/features/student-financial-management/danh-sach-cong-no/components/DanhSachCongNoForm';
import { DanhSachCongNoFilter } from '@renderer/features/student-financial-management/danh-sach-cong-no/components/DanhSachCongNoFilter';
import { ChiTietCongNoModal } from '@renderer/features/student-financial-management/danh-sach-cong-no/components/ChiTietCongNoModal';
import {
  congNoSchema,
  CongNoSchema,
} from '@renderer/features/student-financial-management/danh-sach-cong-no/validation';
import type { CongNoSinhVien } from '@renderer/features/student-financial-management/danh-sach-cong-no/type';
import {
  AddKhoanThuDto,
  ChiTietKhoanThuDto,
} from '@renderer/features/student-financial-management/danh-sach-cong-no/type';

const api = axios.create({ baseURL: env.API_ENDPOINT });

const defaultValues: Partial<CongNoSchema> = {
  sinhVienId: '',
  namHocHocKyId: '',
  hanNop: null,
  ghiChu: '',
};

export default function DanhSachCongNo() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);
  const [selectedHocKy, setSelectedHocKy] = useState<any | null>(null);
  const [selectedHanNop, setSelectedHanNop] = useState<Date | null>(null);
  const [listChiTiet, setListChiTiet] = useState<ChiTietKhoanThuDto[]>([]);

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
    isAddMode,
    tableConfig,
    columnVisibilityModel,
    mergeParams,
    handleRowSelectionModelChange,
    refetch,
  } = useCrudPaginationModal<CongNoSinhVien, CongNoSchema>({
    defaultValues,
    schema: congNoSchema as any,
    entity: 'CongNo',
  });

  const handleSave = async () => {
    const values = formMethods.getValues();
    if (!values.sinhVienId || !values.namHocHocKyId || listChiTiet.length === 0) {
      alert('Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    try {
      const payload: AddKhoanThuDto = {
        sinhVienId: values.sinhVienId,
        namHocHocKyId: values.namHocHocKyId,
        hanNop: selectedHanNop ? new Date(selectedHanNop).toISOString() : null,
        chiTiets: listChiTiet.map((i) => ({
          loaiKhoanThuId: i.loaiKhoanThuId,
          soTien: Number(i.soTien),
          ghiChu: i.ghiChu || '',
        })),
      };

      await api.post('/CongNo/add-khoan-thu', payload);
      alert('Thêm thành công!');

      refetch();

      handleCloseModal();
      setListChiTiet([]);
      setSelectedStudent(null);
      setSelectedHocKy(null);
      setSelectedHanNop(null);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Lỗi khi thêm');
    }
  };

  const handleRowClick = (params: any) => {
    const row = params.row as CongNoSinhVien;
    formMethods.reset({
      sinhVienId: row.sinhVienId,
      namHocHocKyId: row.namHocHocKyId,
      hanNop: row.hanNop,
      ghiChu: row.ghiChu,
    });
    setSelectedId(row.id);
    setSelectedStudent({ id: row.sinhVienId, maSinhVien: row.maSinhVien, hoTen: row.hoTen });
    setSelectedHocKy({ id: row.namHocHocKyId, tenHocKy: row.tenHocKy });
  };

  const rowsData = (data as any)?.Result ?? (data as any)?.result ?? [];

  return (
    <FormProvider {...formMethods}>
      <Stack className="w-full h-full p-2">
        <ActionsToolbar
          selectedRowIds={selectedRows}
          onAdd={onAdd}
          onDelete={() => setIsDeleteOpenModal(true)}
          onExport={(dataOption, columnOption) =>
            exportPaginationToExcel({
              entity: 'CongNoSinhVien',
              filteredData: rowsData,
              columns,
              options: { dataOption, columnOption },
              columnVisibilityModel,
              fileName: 'danh_sach_cong_no',
            })
          }
        />

        {isModalOpen && (
          <FormDetailsModal
            title={isAddMode ? 'Thêm công nợ' : 'Cập nhật công nợ'}
            onClose={handleCloseModal}
            onSave={handleSave}
          >
            <DanhSachCongNoForm
              selectedStudent={selectedStudent}
              setSelectedStudent={setSelectedStudent}
              selectedHocKy={selectedHocKy}
              setSelectedHocKy={setSelectedHocKy}
              selectedHanNop={selectedHanNop}
              setSelectedHanNop={setSelectedHanNop}
              listChiTiet={listChiTiet}
              setListChiTiet={setListChiTiet}
            />
          </FormDetailsModal>
        )}

        {isDeleteOpenModal && (
          <DeleteConfirmationModal
            onClose={() => setIsDeleteOpenModal(false)}
            onDelete={handleDeleteRecord}
          />
        )}

        <DanhSachCongNoFilter
          onApply={(filters: any) => {
            const keyword = [filters.maSinhVien, filters.hoTen].filter(Boolean).join(' ').trim();
            mergeParams({ keyword: keyword || undefined, page: 1 });
          }}
        />

        <DataGridTable
          columns={columns}
          rows={rowsData}
          checkboxSelection
          loading={isRefetching}
          onRowClick={handleRowClick}
          onRowSelectionModelChange={handleRowSelectionModelChange}
          rowSelectionModel={selectedRows}
          height="calc(100% - 85px)"
          {...tableConfig}
        />

        <ChiTietCongNoModal
          open={!!selectedId}
          congNoId={selectedId}
          sinhVienId={selectedStudent?.id}
          namHocHocKyId={selectedHocKy?.id}
          onClose={() => setSelectedId(null)}
          onEdit={() => {
            setSelectedId(null);
          }}
        />
      </Stack>
    </FormProvider>
  );
}
