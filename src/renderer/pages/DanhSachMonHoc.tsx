import { Stack } from '@mui/material';
import { DeleteConfirmationModal, FormDetailsModal } from '@renderer/components/modals';
import { DataGridTable } from '@renderer/components/Table';
import { ActionsToolbar } from '@renderer/components/toolbars';
import { DetailsForm, MonHocFormFilter } from '@renderer/features/danh-sach-mon-hoc';
import { MonHocForm, MonHocSchema } from '@renderer/features/danh-sach-mon-hoc/validation';
import { importMonHocTableColumns, monHocTableColumns } from '@renderer/features/mon-hoc';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';
import { FormProvider } from 'react-hook-form';

const defaultValues = {
  id: undefined,
  maMonHoc: undefined,
  tenMonHoc: undefined,
  maTuQuan: undefined,
  tenTiengAnh: undefined,
  tenVietTat: undefined,
  ghiChu: undefined,
  isKhongTinhTBC: false,
  idLoaiMonHoc: undefined,
  idKhoa: undefined,
  idToBoMon: undefined,
  idLoaiTiet: undefined,
  idKhoiKienThuc: undefined,
  idTinhChatMonHoc: undefined,
};
const defaultValuesFilter = {
  tenMonHoc: undefined,
  maTuQuan: undefined,
  idLoaiMonHoc: undefined,
  idKhoa: undefined,
  idToBoMon: undefined,
  idLoaiTiet: undefined,
  idKhoiKienThuc: undefined,
  idTinhChatMonHoc: undefined,
  locTheoToBoMon: undefined,
};
const DanhSachMonHoc = () => {
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
  } = useCrudPaginationModal<MonHocForm, MonHocForm>({
    defaultValues,
    schema: MonHocSchema,
    entity: 'MonHoc',
  });

  return (
    <FormProvider {...formMethods}>
      <Stack
        className="h-full w-full p-2"
        style={{
          height: '100%',
          width: '100%',
          overflow: 'auto',
          position: 'relative',
          borderRadius: '0px',
        }}
      >
        <ActionsToolbar
          selectedRowIds={selectedRows}
          onDelete={() => setIsDeleteOpenModal(true)}
          onAdd={onAdd}
          onEdit={onEdit}
          onExport={(dataOption, columnOption) => {
            exportPaginationToExcel<MonHocForm>({
              entity: 'MonHoc',
              filteredData: data?.result ?? [],
              columns: monHocTableColumns,
              options: { dataOption, columnOption },
              columnVisibilityModel,
              fileName: 'Danh_sach_mon_hoc',
            });
          }}
          onImport={{
            title: 'Import Danh sách môn học',
            columns: importMonHocTableColumns,
            entity: 'MonHoc',
            onSuccess: refetch,
            sampleFilePath: '/samples/DanhSachMonHoc_Sample.xlsx',
          }}
        />
        {isModalOpen && (
          <FormDetailsModal
            title={isAddMode ? 'Thêm mới môn học' : 'Cập nhật môn học'}
            onClose={handleCloseModal}
            onSave={onSave}
          >
            <DetailsForm />
          </FormDetailsModal>
        )}
        {isDeleteOpenModal && (
          <DeleteConfirmationModal
            onClose={() => setIsDeleteOpenModal(false)}
            onDelete={handleDeleteRecord}
          />
        )}
        <MonHocFormFilter
          onApply={(values) => mergeParams(values)}
          onClear={() => {
            mergeParams(defaultValuesFilter);
          }}
        />
        <DataGridTable
          columns={monHocTableColumns}
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

export default DanhSachMonHoc;
