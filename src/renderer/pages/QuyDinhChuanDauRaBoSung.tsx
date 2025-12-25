import { Stack } from '@mui/material';
import { DeleteConfirmationModal, FormDetailsModal } from '@renderer/components/modals';
import { DataGridTable } from '@renderer/components/Table';
import { ActionsToolbar } from '@renderer/components/toolbars';
import {
  ChuanDauRaBoSung,
  ChuanDauRaBoSungColumns,
  ChuanDauRaBoSungForm,
  ChuanDauRaBoSungSchema,
} from '@renderer/features/chuan-dau-ra-bo-sung';
import { ChuanDauRaBoSungFilterDetail } from '@renderer/features/chuan-dau-ra-bo-sung/components/ChuanDauRaBoSungFilterDetail';
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
  idNganhHoc: undefined,
};

const QuyDinhChuanDauRaBoSung = () => {
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
  } = useCrudPaginationModal<ChuanDauRaBoSung, ChuanDauRaBoSung>({
    defaultValues,
    schema: ChuanDauRaBoSungSchema,
    entity: 'QuyChuanDauRa',
    beforeSubmit: (values) => ({ ...values, isChuanDauRaBoSung: true }),
    defaultState: {
      isChuanDauRaBoSung: true,
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
            exportPaginationToExcel<ChuanDauRaBoSung>({
              entity: 'QuyChuanDauRa',
              filteredData: data?.result ?? [],
              columns: ChuanDauRaBoSungColumns,
              options: { dataOption, columnOption },
              columnVisibilityModel,
              fileName: 'Danh_sach_chuan_dau_ra_bo_sung',
            });
          }}
        />

        {isModalOpen && (
          <FormDetailsModal
            title={isAddMode ? 'Thêm mới chuẩn đầu ra bổ sung' : 'Cập nhật chuẩn đầu ra bổ sung'}
            onClose={handleCloseModal}
            onSave={onSave}
          >
            <ChuanDauRaBoSungForm />
          </FormDetailsModal>
        )}
        {isDeleteOpenModal && (
          <DeleteConfirmationModal
            onClose={() => setIsDeleteOpenModal(false)}
            onDelete={handleDeleteRecord}
          />
        )}
        <ChuanDauRaBoSungFilterDetail onApply={mergeParams} />

        <DataGridTable
          columns={ChuanDauRaBoSungColumns}
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
export default QuyDinhChuanDauRaBoSung;
