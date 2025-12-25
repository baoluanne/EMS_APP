// src/renderer/features/student-financial-management/quan-ly-cong-no/hoan-tien-sinh-vien/DanhSachPhieuChi.tsx
import { Stack } from '@mui/material';
import { FormProvider } from 'react-hook-form';
import { DataGridTable } from '@renderer/components/Table';
import { ActionsToolbar } from '@renderer/components/toolbars';
import { DeleteConfirmationModal, FormDetailsModal } from '@renderer/components/modals';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';
import { useState } from 'react';

import { columns } from '@renderer/features/student-financial-management/hoan-tien-sinh-vien/configs/table.config';
import { DanhSachPhieuChiForm } from '@renderer/features/student-financial-management/hoan-tien-sinh-vien/components/DanhSachPhieuChiForm';
import { DanhSachPhieuChiFilter } from '@renderer/features/student-financial-management/hoan-tien-sinh-vien/components/DanhSachPhieuChiFilter';
import { phieuChiSchema, PhieuChiSchema } from '@renderer/features/student-financial-management/hoan-tien-sinh-vien/validation';
import type { PhieuChiSinhVien } from '@renderer/features/student-financial-management/hoan-tien-sinh-vien/type';

const defaultValues: Partial<PhieuChiSchema> = {
  sinhVienId: '',
  soTien: 0,
  lyDoChi: '',
  hinhThucChi: 'ChuyenKhoan',
};

export default function DanhSachPhieuChi() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const {
    formMethods,
    data,
    isRefetching,
    selectedRows,
    isDeleteOpenModal,
    onSave,
    handleDeleteRecord,
    setIsDeleteOpenModal,
    tableConfig,
    columnVisibilityModel,
    mergeParams,
    handleRowSelectionModelChange,
  } = useCrudPaginationModal<PhieuChiSinhVien, PhieuChiSchema>({
    defaultValues,
    schema: phieuChiSchema,
    entity: 'PhieuChiSinhVien',
  });

  const handleAddClick = () => {
    formMethods.reset(defaultValues);
    setIsCreateOpen(true);
  };

  return (
    <FormProvider {...formMethods}>
      <Stack className="w-full h-full p-2">
        <ActionsToolbar
          selectedRowIds={selectedRows}
          onAdd={handleAddClick}
          onDelete={() => setIsDeleteOpenModal(true)}
          onExport={(dataOption, columnOption) =>
            exportPaginationToExcel({
              entity: 'PhieuChiSinhVien',
              filteredData: data?.result ?? [],
              columns,
              options: { dataOption, columnOption },
              columnVisibilityModel,
              fileName: 'danh_sach_phieu_chi_hoan_tien',
            })
          }
        />

        {isDeleteOpenModal && (
          <DeleteConfirmationModal
            onClose={() => setIsDeleteOpenModal(false)}
            onDelete={handleDeleteRecord}
          />
        )}

        <DanhSachPhieuChiFilter onApply={mergeParams} />

        <DataGridTable
          columns={columns}
          rows={data?.result ?? []}
          checkboxSelection
          loading={isRefetching}
          onRowClick={(params) => formMethods.reset(params.row)}
          onRowSelectionModelChange={handleRowSelectionModelChange}
          rowSelectionModel={selectedRows}
          height="calc(100% - 85px)"
          {...tableConfig}
        />

        {isCreateOpen && (
          <FormDetailsModal
            title="Lập phiếu chi hoàn trả"
            onClose={() => setIsCreateOpen(false)}
            onSave={onSave}
          >
            <DanhSachPhieuChiForm />
          </FormDetailsModal>
        )}
      </Stack>
    </FormProvider>
  );
}
