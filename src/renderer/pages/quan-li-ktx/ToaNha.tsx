import { useMemo, useCallback, useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { Stack } from '@mui/material';
import { DataGridTable } from '@renderer/components/Table';
import { DeleteConfirmationModal, FormDetailsModal } from '@renderer/components/modals';
import { ActionsToolbar } from '@renderer/components/toolbars';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';
import { TITLE_MODE } from '@renderer/shared/enums';

import { ToaNhaForm } from '@renderer/features/ktx-management/toa-nha/components/ToaNhaForm';
import { ToaNhaFilter } from '@renderer/features/ktx-management/toa-nha/components/ToaNhaFilter';
import { ToaNhaStructureSidebar } from '@renderer/features/ktx-management/toa-nha/components/ToaNhaStructureDrawer';
import { toaNhaColumns } from '@renderer/features/ktx-management/toa-nha/configs/table.configs';
import { ToaNhaKtx, toaNhaSchema } from '@renderer/features/ktx-management/toa-nha/validation';
import { ToaNhaFilterState } from '@renderer/features/ktx-management/toa-nha/type';
import { LOAI_TOA_NHA } from '@renderer/features/ktx-management/toa-nha/LoaiToaNhaEnums';

const defaultValues: ToaNhaKtx = {
  id: undefined,
  tenToaNha: '',
  loaiToaNha: LOAI_TOA_NHA.NAM,
  soTang: 1,
  ghiChu: '',
};

const ToaNhaPage = () => {
  const [filters, setFilters] = useState<ToaNhaFilterState>({});
  const [selectedBuilding, setSelectedBuilding] = useState<{ id: string; name: string } | null>(
    null,
  );

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
    if (!filters.tenToaNha && filters.loaiToaNha === undefined) return rawRowsData;
    return rawRowsData.filter((row) => {
      const matchTenToaNha =
        !filters.tenToaNha ||
        row.tenToaNha?.toLowerCase().includes(filters.tenToaNha.toLowerCase());
      const matchLoaiToaNha =
        filters.loaiToaNha === undefined ||
        filters.loaiToaNha === null ||
        Number(row.loaiToaNha) === Number(filters.loaiToaNha);
      return matchTenToaNha && matchLoaiToaNha;
    });
  }, [rawRowsData, filters]);

  const handleViewStructure = useCallback(
    (id: string) => {
      const building = rawRowsData.find((r) => r.id === id);
      if (building) {
        setSelectedBuilding({ id: building.id!, name: building.tenToaNha! });
      }
    },
    [rawRowsData],
  );

  const columns = useMemo(() => toaNhaColumns(handleViewStructure), [handleViewStructure]);

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
              columns,
              options: { dataOption, columnOption },
              columnVisibilityModel,
              fileName: 'Danh_sach_toa_nha',
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

        <ToaNhaFilter onApply={(val) => setFilters(val)} onReset={() => setFilters({})} />

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

        {selectedBuilding && (
          <ToaNhaStructureSidebar
            buildingId={selectedBuilding.id}
            buildingName={selectedBuilding.name}
            onClose={() => setSelectedBuilding(null)}
          />
        )}
      </Stack>
    </FormProvider>
  );
};

export default ToaNhaPage;
