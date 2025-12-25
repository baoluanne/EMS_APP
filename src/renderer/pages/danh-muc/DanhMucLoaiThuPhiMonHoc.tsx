import { Stack } from '@mui/material';
import { Filters } from '@renderer/components/filters';
import { DeleteConfirmationModal, FormDetailsModal } from '@renderer/components/modals';
import { DataGridTable } from '@renderer/components/Table';
import { ActionsToolbar } from '@renderer/components/toolbars';
import {
  loaiThuPhiMonHocColumns,
  DanhMucLoaiThuPhiMonHoc,
  DanhMucLoaiThuPhiMonHocSchema,
  DanhMucLoaiThuPhiMonHocForm,
} from '@renderer/features/danh-muc-loai-thu-phi-mon-hoc';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';
import { FormProvider } from 'react-hook-form';

const DanhMucLoaiThuPhiMonHocPage = () => {
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
  } = useCrudPaginationModal<DanhMucLoaiThuPhiMonHoc, DanhMucLoaiThuPhiMonHoc>({
    defaultValues: {},
    schema: DanhMucLoaiThuPhiMonHocSchema,
    entity: 'DanhMucLoaiThuPhi_MonHoc',
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
              isAddMode ? 'Thêm mới loại thu phí - môn học' : 'Cập nhật loại thu phí - môn học'
            }
            onClose={handleCloseModal}
            onSave={onSave}
          >
            <DanhMucLoaiThuPhiMonHocForm />
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
            exportPaginationToExcel<DanhMucLoaiThuPhiMonHoc>({
              entity: 'DanhMucLoaiThuPhi_MonHoc',
              filteredData: data?.result ?? [],
              columns: loaiThuPhiMonHocColumns,
              options: { dataOption, columnOption },
              columnVisibilityModel,
              fileName: 'Danh_sach_loai_thu_phi_mon_hoc',
            });
          }}
        />
        <Filters onApply={(values) => mergeParams(values)} />

        <DataGridTable
          height={300}
          columns={loaiThuPhiMonHocColumns}
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

export default DanhMucLoaiThuPhiMonHocPage;
