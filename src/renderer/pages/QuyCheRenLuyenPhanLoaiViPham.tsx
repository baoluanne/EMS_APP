import { Stack } from '@mui/material';
import { DeleteConfirmationModal, FormDetailsModal } from '@renderer/components/modals';
import { DataGridTable } from '@renderer/components/Table';
import { ActionsToolbar } from '@renderer/components/toolbars';
import { Filters } from '@renderer/components/filters';
import {
  loaiViPhamColumns,
  QuyCheRenLuyenPhanLoaiViPhamForm,
} from '@renderer/features/quy-che-ren-luyen-phan-loai-vi-pham';
import { LoaiHanhViViPham, LoaiHanhViViPhamSchema } from '@renderer/features/quy-che-ren-luyen-phan-loai-vi-pham/validations';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';
import { FormProvider } from 'react-hook-form';

const QuyCheRenLuyenPhanLoaiViPham = () => {
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
  } = useCrudPaginationModal<LoaiHanhViViPham, LoaiHanhViViPham>({
    defaultValues: {},
    schema: LoaiHanhViViPhamSchema,
    entity: 'LoaiHanhViViPham',
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
            title={isAddMode ? 'Thêm mới phân loại vi phạm' : 'Cập nhật phân loại vi phạm'}
            onClose={handleCloseModal}
            onSave={onSave}
          >
            <QuyCheRenLuyenPhanLoaiViPhamForm />
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
            exportPaginationToExcel<LoaiHanhViViPham>({
              entity: 'LoaiHanhViViPham',
              filteredData: data?.result ?? [],
              columns: loaiViPhamColumns,
              options: { dataOption, columnOption },
              columnVisibilityModel,
              fileName: 'Danh_sach_phan_loai_vi_pham',
            });
          }}
        />
        <Filters onApply={(values) => mergeParams(values)} />

        <DataGridTable
          height={300}
          columns={loaiViPhamColumns}
          rows={data?.result}
          checkboxSelection
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

export default QuyCheRenLuyenPhanLoaiViPham;
