import { Stack } from '@mui/material';
import { FormProvider } from 'react-hook-form';
import { DataGridTable } from '@renderer/components/Table';
import { DeleteConfirmationModal, FormDetailsModal } from '@renderer/components/modals';
import { ActionsToolbar } from '@renderer/components/toolbars';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';

import { NhaCungCapForm } from '../../features/equip-management/nha-cung-cap-thiet-bi/components/nha-cung-cap-thiet-bi-form';
import { NhaCungCapFilter } from '../../features/equip-management/nha-cung-cap-thiet-bi/components/nha-cung-cap-thiet-bi-filter';
import { nhaCungCapColumns as columns } from '../../features/equip-management/nha-cung-cap-thiet-bi/configs/table.configs';
import { NhaCungCapFilterState } from '../../features/equip-management/nha-cung-cap-thiet-bi/type';
import {
  NhaCungCap,
  nhaCungCapSchema,
} from '../../features/equip-management/nha-cung-cap-thiet-bi/validation';
import React, { useMemo, useCallback } from 'react';
import { TITLE_MODE } from '@renderer/shared/enums';

const defaultValues = {
  id: undefined,
  tenNhaCungCap: undefined,
  dienThoai: undefined,
  email: undefined,
  diaChi: undefined,
  ghiChu: undefined,
};

const NhaCungCapPage = () => {
  const [filters, setFilters] = React.useState<NhaCungCapFilterState>({});

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
  } = useCrudPaginationModal<NhaCungCap, NhaCungCap>({
    defaultValues,
    schema: nhaCungCapSchema,
    entity: 'NhaCungCap',
  });
  const rawRowsData: NhaCungCap[] = React.useMemo(() => {
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

  const rowsData: NhaCungCap[] = useMemo(() => {
    if (!filters.tenNhaCungCap && !filters.dienThoai && !filters.email && !filters.diaChi) {
      return rawRowsData;
    }

    return rawRowsData.filter((row) => {
      const matchTenNhaCungCap =
        !filters.tenNhaCungCap ||
        row.tenNhaCungCap?.toLowerCase().includes(filters.tenNhaCungCap.toLowerCase());

      const matchDienThoai =
        !filters.dienThoai ||
        row.dienThoai
          ?.toString()
          .toLowerCase()
          .includes(filters.dienThoai.toString().toLowerCase());

      const matchEmail =
        !filters.email || row.email?.toLowerCase().includes(filters.email.toLowerCase());

      const matchDiaChi =
        !filters.diaChi || row.diaChi?.toLowerCase().includes(filters.diaChi.toLowerCase());

      return matchTenNhaCungCap && matchDienThoai && matchEmail && matchDiaChi;
    });
  }, [rawRowsData, filters]);

  const handleFilterApply = useCallback((filterValues: NhaCungCapFilterState) => {
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
            exportPaginationToExcel<NhaCungCap>({
              entity: 'NhaCungCap',
              filteredData: rowsData,
              columns: columns,
              options: { dataOption, columnOption },
              columnVisibilityModel,
              fileName: 'Danh_sach_nha_cung_cap',
            });
          }}
        />

        {isModalOpen && (
          <FormDetailsModal
            title={isAddMode ? 'Thêm mới nhà cung cấp' : 'Chỉnh sửa nhà cung cấp'}
            onClose={handleCloseModal}
            onSave={onSave}
            maxWidth="sm"
            titleMode={TITLE_MODE.COLORED}
          >
            <NhaCungCapForm />
          </FormDetailsModal>
        )}

        {isDeleteOpenModal && (
          <DeleteConfirmationModal
            onClose={() => setIsDeleteOpenModal(false)}
            onDelete={handleDeleteRecord}
          />
        )}

        <NhaCungCapFilter onApply={handleFilterApply} onReset={handleFilterReset} />

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

export default NhaCungCapPage;
