import { useState, useCallback, useMemo } from 'react';
import { Stack } from '@mui/material';
import { FormProvider } from 'react-hook-form';
import { DataGridTable } from '@renderer/components/Table';
import { DeleteConfirmationModal, FormDetailsModal } from '@renderer/components/modals';
import { ActionsToolbar } from '@renderer/components/toolbars';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';
import { TITLE_MODE } from '@renderer/shared/enums';

import { phongKtxColumns as columns } from '@renderer/features/ktx-management/phong-ktx/configs/table.configs';
import { PhongKtxForm } from '@renderer/features/ktx-management/phong-ktx/components/PhongKtxForm';
import {
  PhongKtxFilter,
  PhongKtxFilterState,
  phongKtxDefaultFilters,
} from '@renderer/features/ktx-management/phong-ktx/components/PhongKtxFilter';
import { phongKtxSchema, PhongKtxs } from '@renderer/features/ktx-management/phong-ktx/validation';

const defaultValues: PhongKtxs = {
  id: undefined,
  maPhong: '',
  toaNhaId: '',
  tenToaNha: '',
  soLuongGiuong: 4,
  soLuongDaO: 0,
  trangThai: 'HOAT_DONG',
  giaPhong: 0,
};

export default function PhongKtxPage() {
  const [filters, setFilters] = useState<PhongKtxFilterState>(phongKtxDefaultFilters);

  const {
    formMethods,
    data,
    isModalOpen,
    isRefetching,
    handleRowSelectionModelChange,
    isDeleteOpenModal,
    onAdd,
    onEdit,
    onSave,
    handleDeleteRecord,
    selectedRows,
    setIsDeleteOpenModal,
    handleCloseModal,
    isAddMode,
    tableConfig,
    columnVisibilityModel,
    refetch,
  } = useCrudPaginationModal<PhongKtxs, PhongKtxs>({
    defaultValues,
    schema: phongKtxSchema,
    entity: 'phongKtx',
  });

  const rowsData = useMemo(() => {
    const rawData = (data as any)?.data || (data as any)?.result || [];
    if (!filters.maPhong && !filters.toaNhaId && !filters.trangThai) return rawData;

    return rawData.filter((row: any) => {
      const matchMa =
        !filters.maPhong || row.maPhong?.toLowerCase().includes(filters.maPhong.toLowerCase());
      const matchToa = !filters.toaNhaId || row.toaNhaId === filters.toaNhaId;
      const matchStatus = !filters.trangThai || row.trangThai === filters.trangThai;
      return matchMa && matchToa && matchStatus;
    });
  }, [data, filters]);

  const handleRefresh = useCallback(() => {
    handleRowSelectionModelChange({ type: 'row', ids: new Set() } as any);
    if (refetch) setTimeout(() => refetch(), 300);
  }, [handleRowSelectionModelChange, refetch]);

  return (
    <FormProvider {...formMethods}>
      <Stack height="100%" width="100%" p={2}>
        <ActionsToolbar
          selectedRowIds={selectedRows}
          onDelete={() => setIsDeleteOpenModal(true)}
          onAdd={onAdd}
          onEdit={onEdit}
          onExport={(dataOption, columnOption) => {
            exportPaginationToExcel<PhongKtxs>({
              entity: 'phong-ktx',
              filteredData: rowsData,
              columns,
              options: { dataOption, columnOption },
              columnVisibilityModel,
              fileName: 'Danh_sach_phong_ktx',
            });
          }}
        />

        {isModalOpen && (
          <FormDetailsModal
            title={isAddMode ? 'Thêm mới Phòng KTX' : 'Chỉnh sửa Phòng KTX'}
            onClose={handleCloseModal}
            onSave={onSave}
            maxWidth="sm"
            titleMode={TITLE_MODE.COLORED}
          >
            <PhongKtxForm />
          </FormDetailsModal>
        )}

        {isDeleteOpenModal && (
          <DeleteConfirmationModal
            onClose={() => setIsDeleteOpenModal(false)}
            onDelete={async () => {
              await handleDeleteRecord();
              handleRefresh();
            }}
          />
        )}

        <PhongKtxFilter onApply={setFilters} onReset={() => setFilters(phongKtxDefaultFilters)} />

        <DataGridTable
          columns={columns}
          rows={rowsData}
          checkboxSelection
          loading={isRefetching}
          onRowClick={(params) => {
            handleRowSelectionModelChange({ type: 'row', ids: new Set() } as any);
            formMethods.reset(params.row);
          }}
          getRowId={(row) => row.id!}
          onRowSelectionModelChange={handleRowSelectionModelChange}
          rowSelectionModel={selectedRows}
          height="calc(100% - 120px)"
          {...tableConfig}
        />
      </Stack>
    </FormProvider>
  );
}
