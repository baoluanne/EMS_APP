import { Stack } from '@mui/material';
import { Filters } from '@renderer/components/filters';
import { DeleteConfirmationModal, FormDetailsModal } from '@renderer/components/modals';
import { DataGridTable } from '@renderer/components/Table';
import { ActionsToolbar } from '@renderer/components/toolbars';
import {
  defaultDanhMucKhoanChi,
  danhMucKhoanChiColumns,
  DanhMucKhoanChiForm,
  danhMucKhoanChiSchema,
  DanhMucKhoanChiSchema,
} from '@renderer/features/danh-muc/khoan-chi';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';
import { FormProvider } from 'react-hook-form';

const KhoanChiPage = () => {
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
  } = useCrudPaginationModal<DanhMucKhoanChiSchema, DanhMucKhoanChiSchema>({
    defaultValues: defaultDanhMucKhoanChi,
    schema: danhMucKhoanChiSchema,
    entity: 'DanhMucKhoanChi',
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
            title={isAddMode ? 'Thêm mới khoản chi' : 'Cập nhật khoản chi'}
            onClose={handleCloseModal}
            onSave={onSave}
            maxWidth="md"
          >
            <DanhMucKhoanChiForm />
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
            exportPaginationToExcel<DanhMucKhoanChiSchema>({
              entity: 'DanhMucKhoanChi',
              filteredData: data?.result ?? [],
              columns: danhMucKhoanChiColumns,
              options: { dataOption, columnOption },
              columnVisibilityModel,
              fileName: 'Danh_sach_khoan_chi',
            });
          }}
        />
        <Filters onApply={(values) => mergeParams(values)} />

        <DataGridTable
          height={300}
          columns={danhMucKhoanChiColumns}
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

export default KhoanChiPage;
