import { useState, useCallback, useMemo } from 'react';
import { Stack } from '@mui/material';
import { FormProvider } from 'react-hook-form';

import { DataGridTable } from '@renderer/components/Table';
import { DeleteConfirmationModal, FormDetailsModal } from '@renderer/components/modals';
import { ActionsToolbar } from '@renderer/components/toolbars';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';
import { TITLE_MODE } from '@renderer/shared/enums';

import { phongKtxColumns as columns } from '../../features/ktx-management/phong-ktx/configs/table.configs';
import { PhongKtxForm } from '../../features/ktx-management/phong-ktx/components/PhongKtxForm';
import {
  PhongKtxFilter,
  PhongKtxFilterState,
} from '../../features/ktx-management/phong-ktx/components/PhongKtxFilter';
import { phongKtxSchema, PhongKtxs } from '../../features/ktx-management/phong-ktx/validation';

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
  const [filters, setFilters] = useState<PhongKtxFilterState>({});

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
  } = useCrudPaginationModal<PhongKtxs, PhongKtxs>({
    defaultValues,
    schema: phongKtxSchema,
    entity: 'phongKtx',
  });

  const rawRowsData: PhongKtxs[] = useMemo(() => {
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

  const rowsData: PhongKtxs[] = useMemo(() => {
    if (!filters.maPhong && !filters.toaNhaId && !filters.trangThai) {
      return rawRowsData;
    }

    return rawRowsData.filter((row: any) => {
      const matchMaPhong =
        !filters.maPhong || row.maPhong?.toLowerCase().includes(filters.maPhong.toLowerCase());

      const matchToaNhaId = !filters.toaNhaId || row.toaNhaId === filters.toaNhaId;

      const matchTrangThai = !filters.trangThai || row.trangThai === filters.trangThai;

      return matchMaPhong && matchToaNhaId && matchTrangThai;
    });
  }, [rawRowsData, filters]);

  const handleFilterApply = useCallback((filterValues: PhongKtxFilterState) => {
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
            maxWidth="md"
            titleMode={TITLE_MODE.COLORED}
          >
            <PhongKtxForm />
          </FormDetailsModal>
        )}

        {isDeleteOpenModal && (
          <DeleteConfirmationModal
            onClose={() => setIsDeleteOpenModal(false)}
            onDelete={handleDeleteRecord}
          />
        )}

        <PhongKtxFilter onApply={handleFilterApply} onReset={handleFilterReset} />

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