import { Stack } from '@mui/material';
import { Filters } from '@renderer/components/filters';
import { DeleteConfirmationModal, FormDetailsModal } from '@renderer/components/modals';
import { DataGridTable } from '@renderer/components/Table';
import { ActionsToolbar } from '@renderer/components/toolbars';
import {
  DanhMucKhoanThuTuDoColumns,
  DanhMucKhoanThuTuDoSchema,
  KhoanThuTuDo,
  KhoanThuTuDoForm,
} from '@renderer/features/danh-muc/khoan-thu-tu-do';
import { parseDonViTinh } from '@renderer/shared/enums/donViTinh.enum';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';
import { FormProvider } from 'react-hook-form';

const defaultValues = {
  id: undefined,
  maKhoanThu: undefined,
  tenKhoanThu: undefined,
  soTien: undefined,
  stt: undefined,
  idLoaiKhoanThu: undefined,
  loaiKhoanThu: undefined,
  thueVAT: undefined,
  gomThueVAT: false,
  isVisible: false,
  donViTinh: undefined,
  ghiChu: undefined,
};

const DanhMucKhoanThuTuDoPage = () => {
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
  } = useCrudPaginationModal<KhoanThuTuDo, KhoanThuTuDo>({
    defaultValues,
    schema: DanhMucKhoanThuTuDoSchema,
    entity: 'DanhMucKhoanThuTuDo',
    beforeEdit: (values) =>
      ({
        ...values,
        donViTinh: parseDonViTinh(values?.donViTinh) ?? undefined,
      }) as KhoanThuTuDo,
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
        <ActionsToolbar
          selectedRowIds={selectedRows}
          onDelete={() => setIsDeleteOpenModal(true)}
          onAdd={onAdd}
          onEdit={onEdit}
          onExport={(dataOption, columnOption) => {
            exportPaginationToExcel<KhoanThuTuDo>({
              entity: 'DanhMucKhoanThuTuDo',
              filteredData: data?.result ?? [],
              columns: DanhMucKhoanThuTuDoColumns,
              options: { dataOption, columnOption },
              columnVisibilityModel,
              fileName: 'danh_muc_khoan_thu_tu_do',
            });
          }}
        />

        {isModalOpen && (
          <FormDetailsModal
            title={
              isAddMode ? 'Thêm mới danh mục khoản thu tự do' : 'Cập nhật danh mục khoản thu tự do'
            }
            onClose={handleCloseModal}
            onSave={onSave}
          >
            <KhoanThuTuDoForm />
          </FormDetailsModal>
        )}
        {isDeleteOpenModal && (
          <DeleteConfirmationModal
            onClose={() => setIsDeleteOpenModal(false)}
            onDelete={handleDeleteRecord}
          />
        )}
        <Filters onApply={(values) => mergeParams(values)} />
        <DataGridTable
          columns={DanhMucKhoanThuTuDoColumns}
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

export default DanhMucKhoanThuTuDoPage;
