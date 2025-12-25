import { Stack } from '@mui/material';
import { Filters } from '@renderer/components/filters';
import { DeleteConfirmationModal, FormDetailsModal } from '@renderer/components/modals';
import { DataGridTable } from '@renderer/components/Table';
import { ActionsToolbar } from '@renderer/components/toolbars';
import {
  danhMucKhoanThuHocPhiColumns,
  DanhMucKhoanThuHocPhiForm,
  danhMucKhoanThuHocPhiSchema,
  DanhMucKhoanThuHocPhiSchema,
  defaultDanhMucKhoanThuHocPhi,
} from '@renderer/features/danh-muc/khoan-thu-hoc-phi';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';
import { FormProvider } from 'react-hook-form';

const DanhMucKhoanThuHocPhiPage = () => {
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
  } = useCrudPaginationModal<DanhMucKhoanThuHocPhiSchema, DanhMucKhoanThuHocPhiSchema>({
    defaultValues: defaultDanhMucKhoanThuHocPhi,
    schema: danhMucKhoanThuHocPhiSchema,
    entity: 'DanhMucKhoanThuHocPhi',
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
            title={isAddMode ? 'Thêm mới khoản thu học phí' : 'Cập nhật khoản thu học phí'}
            onClose={handleCloseModal}
            onSave={onSave}
            maxWidth="md"
          >
            <DanhMucKhoanThuHocPhiForm />
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
            exportPaginationToExcel<DanhMucKhoanThuHocPhiSchema>({
              entity: 'DanhMucKhoanThuHocPhi',
              filteredData: data?.result ?? [],
              columns: danhMucKhoanThuHocPhiColumns,
              options: { dataOption, columnOption },
              columnVisibilityModel,
              fileName: 'Danh_sach_khoan_thu_hoc_phi',
            });
          }}
        />
        <Filters onApply={(values) => mergeParams(values)} />

        <DataGridTable
          height={300}
          columns={danhMucKhoanThuHocPhiColumns}
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

export default DanhMucKhoanThuHocPhiPage;
