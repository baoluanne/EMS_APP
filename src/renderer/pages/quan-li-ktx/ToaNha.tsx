import { useMemo, useCallback, useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { DataGridTable } from '@renderer/components/Table';
import { DeleteConfirmationModal, FormDetailsModal } from '@renderer/components/modals';
import { ActionsToolbar } from '@renderer/components/toolbars';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';
import { TITLE_MODE } from '@renderer/shared/enums';

import { ToaNhaForm } from '@renderer/features/ktx-management/toa-nha/components/ToaNhaForm';
import { ToaNhaFilter } from '@renderer/features/ktx-management/toa-nha/components/ToaNhaFilter';
import { toaNhaColumns as columns } from '@renderer/features/ktx-management/toa-nha/configs/table.configs';
import { ToaNhaKtx, toaNhaSchema } from '@renderer/features/ktx-management/toa-nha/validation';
import { ToaNhaFilterState } from '@renderer/features/ktx-management/toa-nha/type';
import { Stack } from '@mui/material';
import { LOAI_TOA_NHA } from '@renderer/features/ktx-management/toa-nha/LoaiToaNhaEnums';
const defaultValues: ToaNhaKtx = {
  id: undefined,
  tenToaNha: '',
  loaiToaNha: LOAI_TOA_NHA.NAM,
  soTang: 1,
  ghiChu: undefined,
};

const ToaNhaPage = () => {
  const [filters, setFilters] = useState<ToaNhaFilterState>({});
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

  const rawRowsData: ToaNhaKtx[] = useMemo(() => {
    if (!data) return [];
    const results = (data as any).data || (data as any).result || [];
    return Array.isArray(results) ? results : [];
  }, [data]);

  const rowsData: ToaNhaKtx[] = useMemo(() => {
    if (!filters.tenToaNha && !filters.loaiToaNha && filters.soTang && filters.ghiChu) {
      return rawRowsData;
    }

    return rawRowsData.filter((row) => {
      const matchTenToaNha =
        !filters.tenToaNha ||
        row.tenToaNha?.toLowerCase().includes(filters.tenToaNha.toLowerCase());

      const matchghiChu =
        !filters.ghiChu || row.ghiChu?.toLowerCase().includes(filters.ghiChu.toLowerCase());

      const matchLoaiToaNha =
        filters.loaiToaNha === undefined ||
        filters.loaiToaNha === null ||
        Number(row.loaiToaNha) === Number(filters.loaiToaNha);

      const matchsoTang =
        filters.soTang === undefined ||
        filters.soTang === null ||
        Number(row.soTang) === Number(filters.soTang);

      return matchTenToaNha && matchLoaiToaNha && matchghiChu && matchsoTang;
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
              entity: 'ToaNhaKtx',
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
            title={isAddMode ? 'Thêm mới tòa nhà' : 'Chỉnh sửa tòa nhà'}
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

export default ToaNhaPage;
