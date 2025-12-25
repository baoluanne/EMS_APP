import { Stack } from '@mui/material';
import { DeleteConfirmationModal, FormDetailsModal } from '@renderer/components/modals';
import { DataGridTable } from '@renderer/components/Table';
import { ActionsToolbar } from '@renderer/components/toolbars';
import { Filters } from '@renderer/components/filters';
import {
  LoaiChungChi,
  loaiChungChiColumns,
  LoaiChungChiForm,
  LoaiChungChiSchema,
} from '@renderer/features/loai-chung-chi';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';
import { FormProvider } from 'react-hook-form';

const defaultValues = {
  id: undefined,
  maLoaiChungChi: undefined,
  tenLoaiChungChi: undefined,
  stt: undefined,
  ghiChu: undefined,
};

const LoaiChungChiPage = () => {
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
  } = useCrudPaginationModal<LoaiChungChi, LoaiChungChi>({
    defaultValues,
    schema: LoaiChungChiSchema,
    entity: 'LoaiChungChi',
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
            exportPaginationToExcel<LoaiChungChi>({
              entity: 'LoaiChungChi',
              filteredData: data?.result ?? [],
              columns: loaiChungChiColumns,
              options: { dataOption, columnOption },
              columnVisibilityModel,
              fileName: 'Danh_sach_loai_chung_chi',
            });
          }}
        />

        {isModalOpen && (
          <FormDetailsModal
            title={isAddMode ? 'Thêm mới loại chứng chỉ' : 'Cập nhật loại chứng chỉ'}
            onClose={handleCloseModal}
            onSave={onSave}
            maxWidth="md"
          >
            <LoaiChungChiForm />
          </FormDetailsModal>
        )}
        {isDeleteOpenModal && (
          <DeleteConfirmationModal
            onClose={() => setIsDeleteOpenModal(false)}
            onDelete={handleDeleteRecord}
          />
        )}
        <Filters onApply={(value) => mergeParams(value)} />

        <DataGridTable
          columns={loaiChungChiColumns}
          rows={data?.result}
          checkboxSelection
          getRowId={(row) => row.id}
          loading={isRefetching}
          onRowClick={(params) => formMethods.reset(params.row)}
          onRowSelectionModelChange={handleRowSelectionModelChange}
          rowSelectionModel={selectedRows}
          height={'calc(100% - 85px)'}
          {...tableConfig}
        />

      </Stack>
    </FormProvider>
  );
};

export default LoaiChungChiPage;
