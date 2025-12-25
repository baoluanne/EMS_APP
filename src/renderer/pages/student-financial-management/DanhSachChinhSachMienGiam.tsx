import { Stack } from '@mui/material';
import { FormProvider } from 'react-hook-form';
import { DataGridTable } from '@renderer/components/Table';
import { ActionsToolbar } from '@renderer/components/toolbars';
import { DeleteConfirmationModal, FormDetailsModal } from '@renderer/components/modals';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';
import { GridRowId } from '@mui/x-data-grid';
import { columns } from '@renderer/features/student-financial-management/chinh-sach-mien-giam/danh-sach-chinh-sach-mien-giam/configs/table.config';
import { ChinhSachMienGiamForm } from '@renderer/features/student-financial-management/chinh-sach-mien-giam/danh-sach-chinh-sach-mien-giam/components/DanhSachChinhSachMienGiamForm';
import { ChinhSachMienGiamFilter } from '@renderer/features/student-financial-management/chinh-sach-mien-giam/danh-sach-chinh-sach-mien-giam/components/DanhSachChinhSachMienGiamFilter';
import {
  mienGiamSchema,
  MienGiamSchema,
} from '@renderer/features/student-financial-management/chinh-sach-mien-giam/danh-sach-chinh-sach-mien-giam/validation';
import type { ChinhSachMienGiam } from '@renderer/features/student-financial-management/chinh-sach-mien-giam/danh-sach-chinh-sach-mien-giam/type';

const defaultValues: Partial<MienGiamSchema> = {
  tenChinhSach: '',
  loaiChinhSach: 'PhanTram',
  giaTri: 0,
  apDungCho: 'TatCa',
  namHocHocKyId: '',
  dangKichHoat: true,
};

export default function ChinhSachMienGiam() {
  const {
    formMethods,
    data,
    isModalOpen,
    isRefetching,
    selectedRows,
    isDeleteOpenModal,
    onAdd,
    onEdit,
    onSave,
    handleDeleteRecord,
    setIsDeleteOpenModal,
    handleCloseModal,
    isAddMode,
    tableConfig,
    columnVisibilityModel,
    mergeParams,
    handleRowSelectionModelChange,
  } = useCrudPaginationModal<ChinhSachMienGiam, MienGiamSchema>({
    defaultValues,
    schema: mienGiamSchema,
    entity: 'ChinhSachMienGiam',
  });
  const handleEditClick = (row: ChinhSachMienGiam) => {
    formMethods.reset(row);
    onEdit();
  };
  return (
    <FormProvider {...formMethods}>
      <Stack className="w-full h-full p-2">
        <ActionsToolbar
          selectedRowIds={selectedRows}
          onAdd={onAdd}
          onEdit={() => {
            const ids = selectedRows as unknown as GridRowId[];
            if (ids.length === 1) {
              const row = data?.result.find((r) => r.id === ids[0]);
              if (row) handleEditClick(row);
            }
          }}
          onDelete={() => setIsDeleteOpenModal(true)}
          onExport={(do_, co_) =>
            exportPaginationToExcel({
              entity: 'ChinhSachMienGiam',
              filteredData: data?.result ?? [],
              columns,
              options: { dataOption: do_, columnOption: co_ },
              columnVisibilityModel,
              fileName: 'DanhSach_ChinhSach_MienGiam',
            })
          }
        />

        {isDeleteOpenModal && (
          <DeleteConfirmationModal
            onClose={() => setIsDeleteOpenModal(false)}
            onDelete={handleDeleteRecord}
          />
        )}

        <ChinhSachMienGiamFilter onApply={mergeParams} />

        <DataGridTable
          columns={columns}
          rows={(data as any)?.data ?? (data as any)?.result ?? []}
          checkboxSelection
          loading={isRefetching}
          onRowClick={(p) => handleEditClick(p.row)}
          onRowSelectionModelChange={handleRowSelectionModelChange}
          rowSelectionModel={selectedRows}
          height="calc(100% - 85px)"
          {...tableConfig}
        />

        {isModalOpen && (
          <FormDetailsModal
            title={isAddMode ? 'Thiết lập chính sách miễn giảm mới' : 'Cập nhật chính sách'}
            onClose={handleCloseModal}
            onSave={onSave}
          >
            <ChinhSachMienGiamForm />
          </FormDetailsModal>
        )}
      </Stack>
    </FormProvider>
  );
}
