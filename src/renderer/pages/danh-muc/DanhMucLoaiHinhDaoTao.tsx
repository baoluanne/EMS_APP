import { Stack } from '@mui/material';
import { DeleteConfirmationModal, FormDetailsModal } from '@renderer/components/modals';
import { DataGridTable } from '@renderer/components/Table';
import { ActionsToolbar } from '@renderer/components/toolbars';
import {
  DanhMucLoaiHinhDaoTao,
  danhMucLoaiHinhDaoTaoColumns,
  danhMucLoaiHinhDaoTaoDefaultFilter,
  DanhMucLoaiHinhDaoTaoFilter,
  DanhMucLoaiHinhDaoTaoForm,
  danhMucLoaiHinhDaoTaoSchema,
} from '@renderer/features/danh-muc-loai-hinh-dao-tao';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';
import { FormProvider } from 'react-hook-form';

const defaultValues = {
  maLoaiDaoTao: '',
  tenLoaiDaoTao: '',
  tenTiengAnh: '',
  ghiChu: '',
  isVisible: false,
  noidung: '',
};

const DanhMucLoaiHinhDaoTaoPage = () => {
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
  } = useCrudPaginationModal<DanhMucLoaiHinhDaoTao, DanhMucLoaiHinhDaoTao>({
    defaultValues,
    schema: danhMucLoaiHinhDaoTaoSchema,
    entity: 'LoaiDaoTao',
    beforeEdit: (values) => {
      if (!values) return undefined;
      return {
        ...values,
        isVisible: !!values.isVisible,
      };
    },
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
            exportPaginationToExcel<DanhMucLoaiHinhDaoTao>({
              entity: 'LoaiDaoTao',
              filteredData: data?.result ?? [],
              columns: danhMucLoaiHinhDaoTaoColumns,
              options: { dataOption, columnOption },
              columnVisibilityModel,
              fileName: 'Danh_sach_loai_hinh_dao_tao',
            });
          }}
        />

        {isModalOpen && (
          <FormDetailsModal
            title={
              isAddMode
                ? 'Thêm mới danh mục loại hình đào tạo'
                : 'Cập nhật danh mục loại hình đào tạo'
            }
            onClose={handleCloseModal}
            onSave={onSave}
          >
            <DanhMucLoaiHinhDaoTaoForm />
          </FormDetailsModal>
        )}
        {isDeleteOpenModal && (
          <DeleteConfirmationModal
            onClose={() => setIsDeleteOpenModal(false)}
            onDelete={handleDeleteRecord}
          />
        )}

        <DanhMucLoaiHinhDaoTaoFilter
          onApply={mergeParams}
          onClear={() => {
            mergeParams(danhMucLoaiHinhDaoTaoDefaultFilter);
          }}
        />

        <DataGridTable
          columns={danhMucLoaiHinhDaoTaoColumns}
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

export default DanhMucLoaiHinhDaoTaoPage;
