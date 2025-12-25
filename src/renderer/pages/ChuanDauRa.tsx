import { Stack } from '@mui/material';
import { DeleteConfirmationModal, FormDetailsModal } from '@renderer/components/modals';
import { DataGridTable } from '@renderer/components/Table';
import { ActionsToolbar } from '@renderer/components/toolbars';
import {
  ChuanDauRa,
  ChuanDauRaColumns,
  ChuanDauRaFilter,
  ChuanDauRaForm,
  ChuanDauRaSchema,
} from '@renderer/features/chuan-dau-ra';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';
import { FormProvider } from 'react-hook-form';

const defaultValues = {
  id: undefined,
  ghiChu: undefined,
  idCoSoDaoTao: undefined,
  idKhoaHoc: undefined,
  idBacDaoTao: undefined,
  idLoaiDaoTao: undefined,
  idLoaiChungChi: undefined,
  idChungChi: undefined,
};

const ChuanDauRaPage = () => {
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
  } = useCrudPaginationModal<ChuanDauRa, ChuanDauRa>({
    defaultValues,
    schema: ChuanDauRaSchema,
    entity: 'QuyChuanDauRa',
    defaultState: {
      isChuanDauRaBoSung: false,
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
            exportPaginationToExcel<ChuanDauRa>({
              entity: 'QuyChuanDauRa',
              filteredData: data?.result ?? [],
              columns: ChuanDauRaColumns,
              options: { dataOption, columnOption },
              columnVisibilityModel,
              fileName: 'Danh_sach_chuan_dau_ra',
            });
          }}
        />

        {isModalOpen && (
          <FormDetailsModal
            title={isAddMode ? 'Thêm mới chuẩn đầu ra' : 'Cập nhật chuẩn đầu ra'}
            onClose={handleCloseModal}
            onSave={onSave}
          >
            <ChuanDauRaForm />
          </FormDetailsModal>
        )}
        {isDeleteOpenModal && (
          <DeleteConfirmationModal
            onClose={() => setIsDeleteOpenModal(false)}
            onDelete={handleDeleteRecord}
          />
        )}
        <ChuanDauRaFilter onApply={mergeParams} />

        <DataGridTable
          columns={ChuanDauRaColumns}
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
export default ChuanDauRaPage;
