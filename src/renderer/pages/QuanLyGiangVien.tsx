import { Stack } from '@mui/material';
import { DeleteConfirmationModal, FormDetailsModal } from '@renderer/components/modals';
import { DataGridTable } from '@renderer/components/Table';
import { ActionsToolbar } from '@renderer/components/toolbars';
import {
  GiangVienFilters,
  GiangVienForm,
  giangVienTableColumns,
  importGiangVienColumns,
} from '@renderer/features/quan-ly-giang-vien';
import { GiangVien, GiangVienSchema } from '@renderer/features/quan-ly-giang-vien/validations';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';
import { FormProvider } from 'react-hook-form';

const QuanLyGiangVienPage = () => {
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
    refetch,
  } = useCrudPaginationModal<GiangVien, GiangVien>({
    defaultValues: {
      isChamDutHopDong: false,
      isCoiThi: false,
      isKhongChamCong: false,
      isVisible: true,
    },
    schema: GiangVienSchema,
    entity: 'GiangVien',
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
            title={isAddMode ? 'Thêm mới giảng viên' : 'Cập nhật giảng viên'}
            onClose={handleCloseModal}
            onSave={onSave}
          >
            <GiangVienForm />
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
            exportPaginationToExcel<GiangVien>({
              entity: 'GiangVien',
              filteredData: data?.result ?? [],
              columns: giangVienTableColumns,
              options: { dataOption, columnOption },
              columnVisibilityModel,
              fileName: 'Danh_sach_giang_vien',
            });
          }}
          onImport={{
            title: 'Import Danh sách giảng viên',
            columns: importGiangVienColumns,
            entity: 'GiangVien',
            onSuccess: refetch,
            sampleFilePath: '/samples/DanhSachGiangVien_Sample.xlsx',
          }}
        />
        <GiangVienFilters onApply={(values) => mergeParams(values)} />

        <DataGridTable
          height={300}
          columns={giangVienTableColumns}
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

export default QuanLyGiangVienPage;
