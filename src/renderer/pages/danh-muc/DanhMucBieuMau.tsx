import { Stack } from '@mui/material';
import { DeleteConfirmationModal, FormDetailsModal } from '@renderer/components/modals';
import { DataGridTable } from '@renderer/components/Table';
import { ActionsToolbar } from '@renderer/components/toolbars';
import {
  DanhMucBieuMau,
  danhMucBieuMauColumns,
  DanhMucBieuMauFilterForm,
  DanhMucBieuMauForm,
  DanhMucBieuMauSchema,
} from '@renderer/features/danh-muc-bieu-mau';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';
import { FormProvider } from 'react-hook-form';

const DanhMucBieuMauPage = () => {
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
    mergeParams,
  } = useCrudPaginationModal<DanhMucBieuMau, DanhMucBieuMau>({
    defaultValues: {},
    schema: DanhMucBieuMauSchema,
    entity: 'DanhMucBieuMau',
  });

  return (
    <FormProvider {...formMethods}>
      <Stack
        className="w-full h-full p-2"
        style={{
          height: '100%',
          width: '100%',
          overflow: 'auto',
          position: 'relative',
          borderRadius: '0px',
        }}
      >
        {isModalOpen && (
          <FormDetailsModal
            title={isAddMode ? 'Thêm mới biểu mẫu' : 'Cập nhật biểu mẫu'}
            onClose={handleCloseModal}
            onSave={onSave}
            maxWidth="md"
          >
            <DanhMucBieuMauForm />
          </FormDetailsModal>
        )}
        {isDeleteOpenModal && (
          <DeleteConfirmationModal
            onClose={() => setIsDeleteOpenModal(false)}
            onDelete={handleDeleteRecord}
          />
        )}
        <ActionsToolbar
          selectedRowIds={selectedRows}
          onDelete={() => setIsDeleteOpenModal(true)}
          onAdd={onAdd}
          onEdit={onEdit}
          onExport={(dataOption, columnOption) => {
            exportPaginationToExcel<DanhMucBieuMau>({
              entity: 'DanhMucBieuMau',
              filteredData: data?.result ?? [],
              columns: danhMucBieuMauColumns,
              options: { dataOption, columnOption },
              columnVisibilityModel,
              fileName: 'Danh_sach_danh_muc_bieu_mau',
            });
          }}
        />
        <DanhMucBieuMauFilterForm onApply={(values) => mergeParams(values)} />
        <DataGridTable
          height={300}
          columns={danhMucBieuMauColumns}
          rows={data?.result}
          checkboxSelection
          getRowId={(row) => row.id}
          loading={isRefetching}
          onRowClick={(params) => formMethods.reset(params.row)}
          onRowSelectionModelChange={handleRowSelectionModelChange}
          rowSelectionModel={selectedRows}
          {...tableConfig}
        />
      </Stack>
    </FormProvider>
  );
};

export default DanhMucBieuMauPage;
