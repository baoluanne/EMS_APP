import { Stack } from '@mui/material';
import { FormProvider } from 'react-hook-form';
import { DataGridTable } from '@renderer/components/Table';
import { DeleteConfirmationModal, FormDetailsModal } from '@renderer/components/modals';
import { ActionsToolbar } from '@renderer/components/toolbars';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';

import { ToaNhaForm } from '../../features/ktx-management/toa-nha/components/ToaNhaForm';
import {
  ToaNhaFilter,
  ToaNhaFilterState,
} from '../../features/ktx-management/toa-nha/components/ToaNhaFilter';
import { toaNhaColumns as columns } from '../../features/ktx-management/toa-nha/configs/table.configs';
import { ToaNhaKtx, toaNhaSchema } from '../../features/ktx-management/toa-nha/validation';
import React, { useMemo, useCallback } from 'react';
import { TITLE_MODE } from '@renderer/shared/enums';

const defaultValues = {
  id: undefined,
  tenToaNha: undefined,
  loaiToaNha: undefined,
};

const ToaNha = () => {
  const [filters, setFilters] = React.useState<ToaNhaFilterState>({});

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
  } = useCrudPaginationModal<ToaNhaKtx, ToaNhaKtx>({
    defaultValues,
    schema: toaNhaSchema,
    entity: 'ToaNhaKtx',
  });

  const rawRowsData: ToaNhaKtx[] = React.useMemo(() => {
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

  const rowsData: ToaNhaKtx[] = useMemo(() => {
    if (!filters.tenToaNha && !filters.loaiToaNha) {
      return rawRowsData;
    }

    return rawRowsData.filter((row) => {
      const matchTenToaNha =
        !filters.tenToaNha ||
        row.tenToaNha?.toLowerCase().includes(filters.tenToaNha.toLowerCase());

      const matchLoaiToaNha =
        !filters.loaiToaNha ||
        row.loaiToaNha?.toLowerCase().includes(filters.loaiToaNha.toLowerCase());

      return matchTenToaNha && matchLoaiToaNha;
    });
  }, [rawRowsData, filters]);

  const handleFilterApply = useCallback((filterValues: ToaNhaFilterState) => {
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
            exportPaginationToExcel<ToaNhaKtx>({
              entity: 'toa-nha-ktx',
              filteredData: rowsData,
              columns: columns,
              options: { dataOption, columnOption },
              columnVisibilityModel,
              fileName: 'Danh_sach_toa_nha_ktx',
            });
          }}
        />

        {isModalOpen && (
          <FormDetailsModal
            title={isAddMode ? 'Thêm mới Tòa nhà KTX' : 'Chỉnh sửa Tòa nhà KTX'}
            onClose={handleCloseModal}
            onSave={onSave}
            maxWidth="sm"
            titleMode={TITLE_MODE.COLORED}
          >
            <ToaNhaForm />
          </FormDetailsModal>
        )}

        {isDeleteOpenModal && (
          <DeleteConfirmationModal
            onClose={() => setIsDeleteOpenModal(false)}
            onDelete={handleDeleteRecord}
          />
        )}

        <ToaNhaFilter onApply={handleFilterApply} onReset={handleFilterReset} />

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

export default ToaNha;
