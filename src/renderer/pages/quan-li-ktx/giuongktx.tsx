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
  trangThai: 'TRONG',
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
  } = useCrudPaginationModal<GiuongKtxSchema, GiuongKtxSchema>({
    defaultValues,
    schema: giuongKtxSchema,
    entity: 'giuongKtx',
  });

  const rawRowsData: GiuongKtxSchema[] = useMemo(() => {
    if (!data) {
      return [];
    }
    if ('data' in data && Array.isArray(data.data)) {
      return data.data;
    }
    if ('result' in data && Array.isArray(data.result)) {
      return data.result;
    }
    return [];
  }, [data]);

  const rowsData: GiuongKtxSchema[] = useMemo(() => {
    if (!filters.maGiuong && !filters.phongKtxId && !filters.trangThai) {
      return rawRowsData;
    }

    return rawRowsData.filter((row: any) => {
      const matchMaGiuong =
        !filters.maGiuong || row.maGiuong?.toLowerCase().includes(filters.maGiuong.toLowerCase());

      const matchPhongKtxId = !filters.phongKtxId || row.phongKtxId === filters.phongKtxId;

      const matchTrangThai = !filters.trangThai || row.trangThai === filters.trangThai;

      return matchMaGiuong && matchPhongKtxId && matchTrangThai;
    });
  }, [rawRowsData, filters]);

  const handleFilterApply = useCallback((filterValues: GiuongKtxFilterState) => {
    setFilters(filterValues);
  }, []);

  const handleFilterReset = useCallback(() => {
    setFilters({});
  }, []);

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
            onDelete={handleDeleteRecord}
          />
        )}

        <GiuongKtxFilter onApply={handleFilterApply} onReset={handleFilterReset} />

        <DataGridTable
          columns={columns}
          rows={rowsData}
          checkboxSelection
          loading={isRefetching}
          onRowClick={(params) => formMethods.reset(params.row)}
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
