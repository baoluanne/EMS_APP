import { Stack } from '@mui/material';
import { FormProvider } from 'react-hook-form';
import { DataGridTable } from '@renderer/components/Table';
import { DeleteConfirmationModal, FormDetailsModal } from '@renderer/components/modals';
import { ActionsToolbar } from '@renderer/components/toolbars';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';
import { TITLE_MODE } from '@renderer/shared/enums';
import React, { useMemo, useCallback } from 'react';

// Components
import { PhongKtxForm } from '../../features/ktx-management/phong-ktx/components/PhongKtxForm';
import {
  PhongKtxFilter,
  PhongKtxFilterState,
} from '../../features/ktx-management/phong-ktx/components/PhongKtxFilter';
import { phongKtxColumns as columns } from '../../features/ktx-management/phong-ktx/configs/table.configs';
import { PhongKtx, phongKtxSchema } from '../../features/ktx-management/phong-ktx/validation';

const defaultValues = {
  id: undefined,
  idToaNha: undefined,
  maPhong: undefined,
  tenPhong: undefined,
  loaiPhong: undefined,
  soLuongGiuong: 0,
  giaPhong: 0,
  ghiChu: undefined,
};

const PhongKtxComp = () => {
  const [filters, setFilters] = React.useState<PhongKtxFilterState>({});

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
  } = useCrudPaginationModal<PhongKtx, PhongKtx>({
    defaultValues,
    schema: phongKtxSchema,
    entity: 'PhongKtx',
  });

  const rawRowsData: PhongKtx[] = React.useMemo(() => {
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

  // Client-side Filtering Logic (mô phỏng theo ToaNha)
  const rowsData: PhongKtx[] = useMemo(() => {
    const { maPhong, tenPhong, loaiPhong } = filters;

    if (!maPhong && !tenPhong && !loaiPhong) {
      return rawRowsData;
    }

    return rawRowsData.filter((row) => {
      const matchMaPhong = !maPhong || row.maPhong?.toLowerCase().includes(maPhong.toLowerCase());

      const matchTenPhong =
        !tenPhong || row.tenPhong?.toLowerCase().includes(tenPhong.toLowerCase());

      const matchLoaiPhong =
        !loaiPhong || row.loaiPhong?.toLowerCase().includes(loaiPhong.toLowerCase());

      return matchMaPhong && matchTenPhong && matchLoaiPhong;
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
            exportPaginationToExcel<PhongKtx>({
              entity: 'phong-ktx',
              filteredData: rowsData,
              columns: columns,
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
          height="calc(100% - 85px)"
          {...tableConfig}
        />
      </Stack>
    </FormProvider>
  );
};

export default PhongKtxComp;
