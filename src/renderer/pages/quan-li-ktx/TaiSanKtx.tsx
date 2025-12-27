import { Stack } from '@mui/material';
import { FormProvider } from 'react-hook-form';
import { DataGridTable } from '@renderer/components/Table';
import { DeleteConfirmationModal, FormDetailsModal } from '@renderer/components/modals';
import { ActionsToolbar } from '@renderer/components/toolbars';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';

import { TaiSanKtxForm } from '../../features/ktx-management/tai-san-ktx/components/TaiSanKtxForm';
import {
  TaiSanKtxFilter,
  TaiSanKtxFilterState,
} from '../../features/ktx-management/tai-san-ktx/components/TaiSanKtxFilter';
import { taiSanKtxColumns as columns } from '../../features/ktx-management/tai-san-ktx/configs/table.configs';
import { TaiSanKtx, taiSanKtxSchema } from '../../features/ktx-management/tai-san-ktx/validation';
import React, { useMemo, useCallback } from 'react';
import { TITLE_MODE } from '@renderer/shared/enums';

const defaultValues = {
  id: undefined,
  maTaiSan: undefined,
  tenTaiSan: undefined,
  tinhTrang: undefined,
  giaTri: undefined,
  ghiChu: undefined,
  phongKtxId: undefined,
};

const TaiSanKtxPage = () => {
  const [filters, setFilters] = React.useState<TaiSanKtxFilterState>({});

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
  } = useCrudPaginationModal<TaiSanKtx, TaiSanKtx>({
    defaultValues,
    schema: taiSanKtxSchema,
    entity: 'tai-san-ktx',
  });

  const rawRowsData: TaiSanKtx[] = React.useMemo(() => {
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

  const rowsData: TaiSanKtx[] = useMemo(() => {
    if (!filters.tenTaiSan && !filters.tinhTrang && !filters.phongKtxId) {
      return rawRowsData;
    }

    return rawRowsData.filter((row) => {
      const matchTenTaiSan =
        !filters.tenTaiSan ||
        row.tenTaiSan?.toLowerCase().includes(filters.tenTaiSan.toLowerCase());

      const matchTinhTrang =
        !filters.tinhTrang ||
        row.tinhTrang?.toLowerCase().includes(filters.tinhTrang.toLowerCase());

      const matchPhongKtx = !filters.phongKtxId || row.phongKtxId === filters.phongKtxId;

      return matchTenTaiSan && matchTinhTrang && matchPhongKtx;
    });
  }, [rawRowsData, filters]);

  const handleFilterApply = useCallback((filterValues: TaiSanKtxFilterState) => {
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
            exportPaginationToExcel<TaiSanKtx>({
              entity: 'tai-san-ktx',
              filteredData: rowsData,
              columns: columns,
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
            onDelete={handleDeleteRecord}
          />
        )}

        <TaiSanKtxFilter onApply={handleFilterApply} onReset={handleFilterReset} />

        <DataGridTable
          columns={columns}
          rows={rowsData}
          checkboxSelection
          loading={isRefetching}
          onRowClick={(params) => formMethods.reset(params.row)}
          getRowId={(row) => row.id!}
          onRowSelectionModelChange={handleRowSelectionModelChange}
          rowSelectionModel={selectedRows}
          height="calc(100% - 85px)"
          {...tableConfig}
        />
      </Stack>
    </FormProvider>
  );
};

export default TaiSanKtxPage;
