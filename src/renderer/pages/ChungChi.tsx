import { Stack } from '@mui/material';
import { DeleteConfirmationModal, FormDetailsModal } from '@renderer/components/modals';
import { DataGridTable } from '@renderer/components/Table';
import { ActionsToolbar } from '@renderer/components/toolbars';
import {
  ChungChi,
  chungChiColumns,
  ChungChiForm,
  ChungChiSchema,
} from '@renderer/features/chung-chi';
import { LoaiChungChiFilters } from '@renderer/features/loai-chung-chi/components/LoaiChungChiFilters';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';
import { FormProvider } from 'react-hook-form';

const defaultValues = {
  id: undefined,
  tenLoaiChungChi: undefined,
  kyHieu: undefined,
  giaTri: undefined,
  hocPhi: undefined,
  lePhiThi: undefined,
  thoiHan: undefined,
  diemQuyDinh: undefined,
  ghiChu: undefined,
  idLoaiChungChi: undefined,
};

const ChungChiPage = () => {
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
  } = useCrudPaginationModal<ChungChi, ChungChi>({
    defaultValues,
    schema: ChungChiSchema,
    entity: 'ChungChi',
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
            exportPaginationToExcel<ChungChi>({
              entity: 'ChungChi',
              filteredData: data?.result ?? [],
              columns: chungChiColumns,
              options: { dataOption, columnOption },
              columnVisibilityModel,
              fileName: 'Danh_sach_chung_chi',
            });
          }}
        />

        {isModalOpen && (
          <FormDetailsModal
            title={isAddMode ? 'Thêm mới chứng chỉ' : 'Cập nhật chứng chỉ'}
            onClose={handleCloseModal}
            onSave={onSave}
          >
            <ChungChiForm />
          </FormDetailsModal>
        )}
        {isDeleteOpenModal && (
          <DeleteConfirmationModal
            onClose={() => setIsDeleteOpenModal(false)}
            onDelete={handleDeleteRecord}
          />
        )}
        <LoaiChungChiFilters onApply={mergeParams} />

        <DataGridTable
          columns={chungChiColumns}
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

export default ChungChiPage;
