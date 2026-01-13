import { useState, useCallback, useMemo } from 'react';
import { Stack } from '@mui/material';
import { FormProvider } from 'react-hook-form';
import { DataGridTable } from '@renderer/components/Table';
import { DeleteConfirmationModal, FormDetailsModal } from '@renderer/components/modals';
import { ActionsToolbar } from '@renderer/components/toolbars';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';
import { TITLE_MODE } from '@renderer/shared/enums';

import { TaiSanKtxForm } from '../../features/ktx-management/tai-san-ktx/components/TaiSanKtxForm';
import {
  taiSanKtxDefaultFilters,
  TaiSanKtxFilter,
  TaiSanKtxFilterState,
} from '../../features/ktx-management/tai-san-ktx/components/TaiSanKtxFilter';
import { taiSanKtxColumns as columns } from '../../features/ktx-management/tai-san-ktx/configs/table.configs';
import {
  taiSanKtxSchema,
  TaiSanKtxSchema,
} from '../../features/ktx-management/tai-san-ktx/validation';

const defaultValues: TaiSanKtxSchema = {
  id: undefined,
  maTaiSan: '',
  tenTaiSan: '',
  tinhTrang: 'Tot',
  giaTri: 0,
  ghiChu: '',
  phongKtxId: '',
};

export default function TaiSanKtxPage() {
  const [filters, setFilters] = useState<TaiSanKtxFilterState>(taiSanKtxDefaultFilters);

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
  } = useCrudPaginationModal<TaiSanKtxSchema, TaiSanKtxSchema>({
    defaultValues,
    schema: taiSanKtxSchema,
    entity: 'tai-san-ktx',
  });

  const rowsData = useMemo(() => {
    const rawData = (data as any)?.data || (data as any)?.result || [];
    if (!filters.tenTaiSan && !filters.tinhTrang && !filters.phongKtxId) return rawData;

    return rawData.filter((row: any) => {
      const matchTen =
        !filters.tenTaiSan ||
        row.tenTaiSan?.toLowerCase().includes(filters.tenTaiSan.toLowerCase());
      const matchTinhTrang = !filters.tinhTrang || row.tinhTrang === filters.tinhTrang;
      const matchPhong = !filters.phongKtxId || row.phongKtxId === filters.phongKtxId;
      return matchTen && matchTinhTrang && matchPhong;
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
            exportPaginationToExcel<TaiSanKtxSchema>({
              entity: 'tai-san-ktx',
              filteredData: rowsData,
              columns,
              options: { dataOption, columnOption },
              columnVisibilityModel,
              fileName: 'Danh_sach_tai_san_ktx',
            });
          }}
        />

        {isModalOpen && (
          <FormDetailsModal
            title={isAddMode ? 'Thêm mới Tài sản KTX' : 'Chỉnh sửa Tài sản KTX'}
            onClose={handleCloseModal}
            onSave={onSave}
            maxWidth="sm"
            titleMode={TITLE_MODE.COLORED}
          >
            <TaiSanKtxForm />
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

        <TaiSanKtxFilter onApply={setFilters} onReset={() => setFilters(taiSanKtxDefaultFilters)} />

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
