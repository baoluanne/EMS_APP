import { Stack } from '@mui/material';
import { DeleteConfirmationModal, FormDetailsModal } from '@renderer/components/modals';
import { DataGridTable } from '@renderer/components/Table';
import { ActionsToolbar } from '@renderer/components/toolbars';
import { Filters } from '@renderer/components/filters';
import {
  KhoiKienThuc,
  khoiKienThucColumns,
  KhoiKienThucForm,
} from '@renderer/features/khoi-kien-thuc';
import { KhoiKienThucSchema } from '@renderer/features/khoi-kien-thuc/validation';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';
import { FormProvider } from 'react-hook-form';

const KhoiKienThucPage = () => {
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
  } = useCrudPaginationModal<KhoiKienThuc, KhoiKienThuc>({
    defaultValues: {},
    schema: KhoiKienThucSchema,
    entity: 'KhoiKienThuc',
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
            title={isAddMode ? 'Thêm mới khối kiến thức' : 'Cập nhật khối kiến thức'}
            onClose={handleCloseModal}
            onSave={onSave}
            maxWidth="md"
          >
            <KhoiKienThucForm />
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
            exportPaginationToExcel<KhoiKienThuc>({
              entity: 'KhoiKienThuc',
              filteredData: data?.result ?? [],
              columns: khoiKienThucColumns,
              options: { dataOption, columnOption },
              columnVisibilityModel,
              fileName: 'Danh_sach_khoi_kien_thuc',
            });
          }}
        />
        <Filters onApply={(values) => mergeParams(values)} />

        <DataGridTable
          height={300}
          columns={khoiKienThucColumns}
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

export default KhoiKienThucPage;
