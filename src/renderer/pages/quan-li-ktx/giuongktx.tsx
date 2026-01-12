import { useState, useCallback, useMemo } from 'react';
import { Stack } from '@mui/material';
import { FormProvider } from 'react-hook-form';

import { DataGridTable } from '@renderer/components/Table';
import { DeleteConfirmationModal, FormDetailsModal } from '@renderer/components/modals';
import { ActionsToolbar } from '@renderer/components/toolbars';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';
import { TITLE_MODE } from '@renderer/shared/enums';

import { giuongKtxColumns as columns } from '@renderer/features/ktx-management/giuong-ktx/configs/table.configs';
import { GiuongKtxForm } from '@renderer/features/ktx-management/giuong-ktx/components/GiuongKtxForm';
import {
  GiuongKtxFilter,
  GiuongKtxFilterState,
} from '@renderer/features/ktx-management/giuong-ktx/components/GiuongKtxFilter';
import {
  giuongKtxSchema,
  GiuongKtxSchema,
} from '@renderer/features/ktx-management/giuong-ktx/validation';

const defaultValues: GiuongKtxSchema = {
  id: undefined,
  maGiuong: '',
  phongKtxId: '',
  trangThai: 'Trong',
  ghiChu: '',
};

export default function GiuongKtxPage() {
  const [filters, setFilters] = useState<GiuongKtxFilterState>({});

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
  } = useCrudPaginationModal<GiuongKtxSchema, GiuongKtxSchema>({
    defaultValues,
    schema: giuongKtxSchema,
    entity: 'giuongKtx',
  });

  const rowsData = useMemo(() => {
    const rawData = (data as any)?.data || (data as any)?.result || [];
    if (!filters.maGiuong && !filters.phongKtxId && !filters.trangThai) return rawData;

    return rawData.filter((row: any) => {
      const matchMa =
        !filters.maGiuong || row.maGiuong?.toLowerCase().includes(filters.maGiuong.toLowerCase());
      const matchPhong = !filters.phongKtxId || row.phongKtxId === filters.phongKtxId;
      const matchTrangThai = !filters.trangThai || row.trangThai === filters.trangThai;
      return matchMa && matchPhong && matchTrangThai;
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
            exportPaginationToExcel<GiuongKtxSchema>({
              entity: 'giuong-ktx',
              filteredData: rowsData,
              columns,
              options: { dataOption, columnOption },
              columnVisibilityModel,
              fileName: 'Danh_sach_giuong_ktx',
            });
          }}
        />

        {isModalOpen && (
          <FormDetailsModal
            title={isAddMode ? 'Thêm mới Giường KTX' : 'Chỉnh sửa Giường KTX'}
            onClose={handleCloseModal}
            onSave={onSave}
            maxWidth="sm"
            titleMode={TITLE_MODE.COLORED}
          >
            <GiuongKtxForm />
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

        <GiuongKtxFilter onApply={setFilters} onReset={() => setFilters({})} />

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
