import { useMemo, useState } from 'react';
import { Stack } from '@mui/material';
import { FormProvider } from 'react-hook-form';
import { DataGridTable } from '@renderer/components/Table';
import { FormDetailsModal, DeleteConfirmationModal } from '@renderer/components/modals';
import { ActionsToolbar } from '@renderer/components/toolbars';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';
import { TITLE_MODE } from '@renderer/shared/enums';
import { duyetDonColumns } from '@renderer/features/ktx-management/duyet-don/configs/table.configs';
import {
  duyetDonSchema,
  DuyetDon,
  DuyetDonFilterState,
} from '@renderer/features/ktx-management/duyet-don/validation';
import { DuyetDonForm } from '@renderer/features/ktx-management/duyet-don/components/DuyetDonForm';
import { DuyetDonFilter } from '@renderer/features/ktx-management/duyet-don/components/DuyetDonFilter';
import { ApproveDonModal } from '@renderer/features/ktx-management/duyet-don/components/ApproveDonModal';
import { KtxDonTrangThai } from '@renderer/features/ktx-management/duyet-don/configs/KtxDonEnum';

const defaultValues = { trangThai: KtxDonTrangThai.ChoDuyet, ghiChu: '' };

const DuyetDonPage = () => {
  const [filters, setFilters] = useState<DuyetDonFilterState>({});
  const [targetId, setTargetId] = useState<string | null>(null);

  const {
    formMethods,
    data,
    isModalOpen,
    isRefetching,
    handleRowSelectionModelChange,
    onAdd,
    onEdit,
    onSave,
    selectedRows,
    handleDeleteRecord,
    setIsDeleteOpenModal,
    isDeleteOpenModal,
    handleCloseModal,
    tableConfig,
    columnVisibilityModel,
    refetch,
    isAddMode,
  } = useCrudPaginationModal<DuyetDon, DuyetDon>({
    defaultValues,
    schema: duyetDonSchema,
    entity: 'DonKtx',
  });

  const columns = useMemo(() => duyetDonColumns((id) => setTargetId(id)), []);
  const rowsData = useMemo(() => {
    const rawData = (data as any)?.result || [];
    return rawData.filter((row: any) => {
      const matchLoai = filters.loaiDon === undefined || row.loaiDon === filters.loaiDon;
      const matchTrangThai = filters.trangThai === undefined || row.trangThai === filters.trangThai;
      return matchLoai && matchTrangThai;
    });
  }, [data, filters]);

  return (
    <FormProvider {...formMethods}>
      <Stack height="100%" width="100%" p={2}>
        <ActionsToolbar
          selectedRowIds={selectedRows}
          onDelete={() => setIsDeleteOpenModal(true)}
          onAdd={onAdd}
          onEdit={onEdit}
          onExport={(dataOption, columnOption) => {
            exportPaginationToExcel<DuyetDon>({
              entity: 'don-ktx',
              filteredData: rowsData,
              columns: columns,
              options: { dataOption, columnOption },
              columnVisibilityModel,
              fileName: 'Danh_sach_don_ktx',
            });
          }}
        />
        {isModalOpen && (
          <FormDetailsModal
            title={isAddMode ? 'Tạo đơn mới' : 'Chi tiết đơn từ'}
            onClose={handleCloseModal}
            onSave={onSave}
            maxWidth="sm"
            titleMode={TITLE_MODE.COLORED}
          >
            <DuyetDonForm />
          </FormDetailsModal>
        )}
        {targetId && (
          <ApproveDonModal
            selectedId={targetId}
            onClose={() => setTargetId(null)}
            onSuccess={() => refetch()}
          />
        )}
        {isDeleteOpenModal && (
          <DeleteConfirmationModal
            onClose={() => setIsDeleteOpenModal(false)}
            onDelete={async () => {
              await handleDeleteRecord();
              refetch();
            }}
          />
        )}
        <DuyetDonFilter onApply={setFilters} onReset={() => setFilters({})} />
        <DataGridTable
          columns={columns}
          rows={rowsData}
          checkboxSelection
          loading={isRefetching}
          getRowId={(row) => row.id}
          onRowSelectionModelChange={handleRowSelectionModelChange}
          rowSelectionModel={selectedRows}
          height="calc(100% - 85px)"
          {...tableConfig}
        />
      </Stack>
    </FormProvider>
  );
};

export default DuyetDonPage;
