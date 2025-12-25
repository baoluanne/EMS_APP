import { Stack } from '@mui/material';
import { DeleteConfirmationModal, FormDetailsModal } from '@renderer/components/modals';
import { DataGridTable } from '@renderer/components/Table';
import { ActionsToolbar } from '@renderer/components/toolbars';
import {
  DanhMucKhungHoSoHssv,
  danhMucKhungHoSoHssvColumns,
  DanhMucKhungHoSoHssvFilterForm,
  DanhMucKhungHoSoHssvForm,
  DanhMucKhungHoSoHssvSchema,
} from '@renderer/features/danh-muc-khung-ho-so-hssv';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';
import { FormProvider } from 'react-hook-form';

const DanhMucKhungHoSoHssvPage = () => {
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
  } = useCrudPaginationModal<DanhMucKhungHoSoHssv, DanhMucKhungHoSoHssv>({
    defaultValues: {},
    schema: DanhMucKhungHoSoHssvSchema,
    entity: 'DanhMucKhungHoSoHssv',
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
            title={isAddMode ? 'Thêm mới Khung hồ sơ HSSV' : 'Cập nhật Khung hồ sơ HSSV'}
            onClose={handleCloseModal}
            onSave={onSave}
          >
            <DanhMucKhungHoSoHssvForm />
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
            exportPaginationToExcel<DanhMucKhungHoSoHssv>({
              entity: 'DanhMucKhungHoSoHssv',
              filteredData: data?.result ?? [],
              columns: danhMucKhungHoSoHssvColumns,
              options: { dataOption, columnOption },
              columnVisibilityModel,
              fileName: 'Danh_sach_danh_muc_khung_ho_so_hssv',
            });
          }}
        />
        <DanhMucKhungHoSoHssvFilterForm onApply={(values) => mergeParams(values)} />
        <DataGridTable
          height={300}
          columns={danhMucKhungHoSoHssvColumns}
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

export default DanhMucKhungHoSoHssvPage;
