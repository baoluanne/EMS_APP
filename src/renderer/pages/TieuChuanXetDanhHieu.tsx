import { Stack } from '@mui/material';
import { DeleteConfirmationModal, FormDetailsModal } from '@renderer/components/modals';
import { DataGridTable } from '@renderer/components/Table';
import { ActionsToolbar } from '@renderer/components/toolbars';
import { Filters } from '@renderer/components/filters';
import {
  tieuChuanXetDanhHieuColumns,
  TieuChuanXetDanhHieuForm,
} from '@renderer/features/tieu-chuan-xet-danh-hieu';
import { TieuChuanXetDanhHieu, TieuChuanXetDanhHieuSchema } from '@renderer/features/tieu-chuan-xet-danh-hieu/validations';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';
import { FormProvider } from 'react-hook-form';

const TieuChuanXetDanhHieuPage = () => {
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
  } = useCrudPaginationModal<TieuChuanXetDanhHieu, TieuChuanXetDanhHieu>({
    defaultValues: {},
    schema: TieuChuanXetDanhHieuSchema,
    entity: 'TieuChuanXetDanhHieu',
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
              isAddMode ? 'Thêm mới tiêu chuẩn xét danh hiệu' : 'Cập nhật tiêu chuẩn xét danh hiệu'
            }
            onClose={handleCloseModal}
            onSave={onSave}
          >
            <TieuChuanXetDanhHieuForm />
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
            exportPaginationToExcel<TieuChuanXetDanhHieu>({
              entity: 'TieuChuanXetDanhHieu',
              filteredData: data?.result ?? [],
              columns: tieuChuanXetDanhHieuColumns,
              options: { dataOption, columnOption },
              columnVisibilityModel,
              fileName: 'Danh_sach_tieu_chuan_xet_danh_hieu',
            });
          }}
        />
        <Filters onApply={(values) => mergeParams(values)} />

        <DataGridTable
          height={300}
          columns={tieuChuanXetDanhHieuColumns}
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

export default TieuChuanXetDanhHieuPage;
