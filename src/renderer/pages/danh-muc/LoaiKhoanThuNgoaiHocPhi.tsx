import { Stack } from '@mui/material';
import { Filters } from '@renderer/components/filters';
import { DeleteConfirmationModal, FormDetailsModal } from '@renderer/components/modals';
import { DataGridTable } from '@renderer/components/Table';
import { ActionsToolbar } from '@renderer/components/toolbars';
import {
  loaiKhoanThuNgoaiHocPhiColumns,
  LoaiKhoanThuNgoaiHocPhiForm,
  loaiKhoanThuNgoaiHocPhiSchema,
  LoaiKhoanThuNgoaiHocPhiSchema,
} from '@renderer/features/danh-muc/loai-khoan-thu-ngoai-hoc-phi';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';
import { FormProvider } from 'react-hook-form';

const LoaiKhoanThuNgoaiHocPhiPage = () => {
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
  } = useCrudPaginationModal<LoaiKhoanThuNgoaiHocPhiSchema, LoaiKhoanThuNgoaiHocPhiSchema>({
    defaultValues: {},
    schema: loaiKhoanThuNgoaiHocPhiSchema,
    entity: 'DanhMucLoaiKhoanThuNgoaiHocPhi',
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
            title={
              isAddMode
                ? 'Thêm mới loại khoản thu ngoài học phí'
                : 'Cập nhật loại khoản thu ngoài học phí'
            }
            onClose={handleCloseModal}
            onSave={onSave}
            maxWidth="md"
          >
            <LoaiKhoanThuNgoaiHocPhiForm />
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
            exportPaginationToExcel<LoaiKhoanThuNgoaiHocPhiSchema>({
              entity: 'LoaiKhoanThuNgoaiHocPhi',
              filteredData: data?.result ?? [],
              columns: loaiKhoanThuNgoaiHocPhiColumns,
              options: { dataOption, columnOption },
              columnVisibilityModel,
              fileName: 'Danh_sach_loai_khoan_thu_ngoai_hoc_phi',
            });
          }}
        />
        <Filters onApply={(values) => mergeParams(values)} />

        <DataGridTable
          height={300}
          columns={loaiKhoanThuNgoaiHocPhiColumns}
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

export default LoaiKhoanThuNgoaiHocPhiPage;
