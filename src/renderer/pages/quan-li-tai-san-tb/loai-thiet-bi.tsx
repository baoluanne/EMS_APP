import { Stack } from '@mui/material';
import { FormProvider } from 'react-hook-form';
import { DataGridTable } from '@renderer/components/Table';
import { DeleteConfirmationModal, FormDetailsModal } from '@renderer/components/modals';
import { ActionsToolbar } from '@renderer/components/toolbars';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';

import { LoaiThietBiForm } from '../../features/equip-management/loai-thiet-bi/components/loai-thiet-bi-form';
import { LoaiThietBiFilter } from '../../features/equip-management/loai-thiet-bi/components/loai-thiet-bi-filter';
import { loaiThietBiColumns as columns } from '../../features/equip-management/loai-thiet-bi/configs/table.configs';
import { LoaiThietBiFilterState } from '../../features/equip-management/loai-thiet-bi/type';
import {
  LoaiThietBi,
  loaiThietBiSchema,
} from '../../features/equip-management/loai-thiet-bi/validation';
import React, { useMemo, useCallback } from 'react';
import { TITLE_MODE } from '@renderer/shared/enums';

const defaultValues = {
  id: undefined,
  maLoai: undefined,
  tenLoai: undefined,
  moTa: undefined,
};

const LoaiThietBiPage = () => {
  const [filters, setFilters] = React.useState<LoaiThietBiFilterState>({});

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
  } = useCrudPaginationModal<LoaiThietBi, LoaiThietBi>({
    defaultValues,
    schema: loaiThietBiSchema,
    entity: 'LoaiThietBi',
  });

  const rawRowsData: LoaiThietBi[] = React.useMemo(() => {
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

  const rowsData: LoaiThietBi[] = useMemo(() => {
    if (!filters.maLoai && !filters.tenLoai) {
      return rawRowsData;
    }

    return rawRowsData.filter((row) => {
      const matchMaLoai =
        !filters.maLoai || row.maLoai?.toLowerCase().includes(filters.maLoai.toLowerCase());

      const matchTenLoai =
        !filters.tenLoai || row.tenLoai?.toLowerCase().includes(filters.tenLoai.toLowerCase());

      return matchMaLoai && matchTenLoai;
    });
  }, [rawRowsData, filters]);

  const handleFilterApply = useCallback((filterValues: LoaiThietBiFilterState) => {
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
            exportPaginationToExcel<LoaiThietBi>({
              entity: 'loai-thiet-bi',
              filteredData: rowsData,
              columns: columns,
              options: { dataOption, columnOption },
              columnVisibilityModel,
              fileName: 'Danh_sach_loai_thiet_bi',
            });
          }}
        />

        {isModalOpen && (
          <FormDetailsModal
            title={isAddMode ? 'Thêm mới loại thiết bị' : 'Chỉnh sửa loại thiết bị'}
            onClose={handleCloseModal}
            onSave={onSave}
            maxWidth="sm"
            titleMode={TITLE_MODE.COLORED}
          >
            <LoaiThietBiForm />
          </FormDetailsModal>
        )}

        {isDeleteOpenModal && (
          <DeleteConfirmationModal
            onClose={() => setIsDeleteOpenModal(false)}
            onDelete={handleDeleteRecord}
          />
        )}

        <LoaiThietBiFilter onApply={handleFilterApply} onReset={handleFilterReset} />

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

export default LoaiThietBiPage;
