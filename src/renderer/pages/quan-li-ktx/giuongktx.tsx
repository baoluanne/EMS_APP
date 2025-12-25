import React, { useMemo, useCallback, useState } from 'react';
import { Stack } from '@mui/material';
import { FormProvider } from 'react-hook-form';
import { DataGridTable } from '@renderer/components/Table';
import { DeleteConfirmationModal, FormDetailsModal } from '@renderer/components/modals';
import { ActionsToolbar } from '@renderer/components/toolbars';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';

import { giuongKtxColumns as columns } from '@renderer/features/ktx-management/giuong-ktx/configs/table.configs';
import { GiuongKtxForm } from '@renderer/features/ktx-management/giuong-ktx/components/GiuongKtxForm';
import {
  GiuongKtxFilter,
  GiuongKtxFilterState,
} from '@renderer/features/ktx-management/giuong-ktx/components/GiuongKtxFilter';
import {
  giuongKtxSchema,
  type GiuongKtxSchema,
} from '@renderer/features/ktx-management/giuong-ktx/validation';
import { TITLE_MODE } from '@renderer/shared/enums';

const defaultValues: GiuongKtxSchema = {
  id: undefined,
  maGiuong: '',
  phongKtxId: '',
  trangThai: 'Trong',
};

export default function GiuongKtx() {
  const [filters, setFilters] = React.useState<GiuongKtxFilterState>({});
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
  });

  const rawRowsData: GiuongKtxSchema[] = useMemo(() => {
    if (!data) return [];
    const res = (data as any).data || (data as any).result || [];
    return Array.isArray(res) ? res : [];
  }, [data]);

  const rowsData: GiuongKtxSchema[] = useMemo(() => {
    return rawRowsData.filter((row) => {
      const matchMaGiuong =
        !filters.maGiuong || row.maGiuong?.toLowerCase().includes(filters.maGiuong.toLowerCase());
      const matchPhong = !filters.phongId || row.phongKtxId === filters.phongId;
      const matchTrangThai = !filters.trangThai || row.trangThai === filters.trangThai;
      return matchMaGiuong && matchPhong && matchTrangThai;
    });
  }, [rawRowsData, filters]);

  const handleRowClick = useCallback(
    (params: any) => {
      const rowId = params.row.id;
      handleRowSelectionModelChange([rowId] as any);
    },
    [handleRowSelectionModelChange],
  );

  const handleAdd = useCallback(() => {
    formMethods.reset(defaultValues);
    setIsCustomAddMode(true);
    setCustomModalOpen(true);
  }, [formMethods]);

  const handleEditFromToolbar = useCallback(() => {
    if (!selectedRows || !selectedRows.ids || selectedRows.ids.size !== 1) {
      console.log('selectedRows:', selectedRows);
      return;
    }

    const selectedId = Array.from(selectedRows.ids)[0];
    const rowToEdit = rowsData.find((r) => r.id === selectedId);

    if (rowToEdit) {
      console.log('Found row to edit:', rowToEdit);
      formMethods.reset(rowToEdit);
      setIsCustomAddMode(false);
      setCustomModalOpen(true);
    } else {
      console.log('Row not found, selectedId:', selectedId);
    }
  }, [selectedRows, rowsData, formMethods]);

  const handleCloseModal = useCallback(() => {
    setCustomModalOpen(false);
  }, []);

  const handleCustomSave = formMethods.handleSubmit(async (values) => {
    try {
      const payload = { ...values };

      if (isCustomAddMode) {
        delete payload.id;
      }
      const apiUrl = isCustomAddMode
        ? `http://localhost:5031/api/giuongKtx`
        : `http://localhost:5031/api/giuongKtx/${values.id}`;
      const method = isCustomAddMode ? 'POST' : 'PUT';

      console.log('Saving:', { method, url: apiUrl, data: payload });

      const response = await fetch(apiUrl, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      setCustomModalOpen(false);
      refetch?.();

      alert(isCustomAddMode ? 'Thêm mới thành công' : 'Cập nhật thành công');
    } catch (error: any) {
      console.error('Save error:', error);
      alert(error.message || 'Có lỗi xảy ra');
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
            onClose={handleCloseModal}
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
          onRowClick={handleRowClick}
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
