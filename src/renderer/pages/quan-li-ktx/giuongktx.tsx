import React, { useState, useCallback } from 'react';
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
  ghiChu: '',
  isVisible: true,
};

export default function GiuongKtxPage() {
  const [filters, setFilters] = useState<GiuongKtxFilterState>({});
  const [customModalOpen, setCustomModalOpen] = useState(false);
  const [isCustomAddMode, setIsCustomAddMode] = useState(true);

  const {
    formMethods,
    data,
    isRefetching,
    handleRowSelectionModelChange,
    isDeleteOpenModal,
    handleDeleteRecord,
    selectedRows,
    setIsDeleteOpenModal,
    tableConfig,
    columnVisibilityModel,
    refetch,
  } = useCrudPaginationModal<GiuongKtxSchema, GiuongKtxSchema>({
    defaultValues,
    schema: giuongKtxSchema,
    entity: 'giuongKtx',
    filters,
  });
  const rowsData = React.useMemo(() => {
    if (!data) return [];
    if ('data' in data && Array.isArray(data.data)) return data.data;
    if ('result' in data && Array.isArray(data.result)) return data.result;
    if (Array.isArray(data)) return data;
    return [];
  }, [data]);

  const handleAdd = useCallback(() => {
    formMethods.reset(defaultValues);
    setIsCustomAddMode(true);
    setCustomModalOpen(true);
  }, [formMethods]);

  const handleEditFromToolbar = useCallback(() => {
    if (!selectedRows || selectedRows.length !== 1) return;
    const selectedId = selectedRows[0];
    const rowToEdit = rowsData.find((r: any) => r.id === selectedId);

    if (rowToEdit) {
      formMethods.reset(rowToEdit);
      setIsCustomAddMode(false);
      setCustomModalOpen(true);
    }
  }, [selectedRows, rowsData, formMethods]);
  const handleCustomSave = formMethods.handleSubmit(async (values) => {
    try {
      console.log('Form Values Submitted:', values);
      setCustomModalOpen(false);
      refetch?.();
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <FormProvider {...formMethods}>
      <Stack height="100%" width="100%" p={2}>
        <ActionsToolbar
          selectedRowIds={selectedRows}
          onDelete={() => setIsDeleteOpenModal(true)}
          onAdd={handleAdd}
          onEdit={handleEditFromToolbar}
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

        {customModalOpen && (
          <FormDetailsModal
            title={isCustomAddMode ? 'Thêm mới Giường KTX' : 'Chỉnh sửa Giường KTX'}
            onClose={() => setCustomModalOpen(false)}
            onSave={handleCustomSave}
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

        <GiuongKtxFilter onApply={(val) => setFilters(val)} onReset={() => setFilters({})} />

        <DataGridTable
          columns={columns}
          rows={rowsData}
          checkboxSelection
          loading={isRefetching}
          onRowSelectionModelChange={handleRowSelectionModelChange}
          rowSelectionModel={selectedRows}
          height="calc(100% - 120px)"
          {...tableConfig}
        />
      </Stack>
    </FormProvider>
  );
}
