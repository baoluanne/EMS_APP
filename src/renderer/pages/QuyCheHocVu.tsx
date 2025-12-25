import { Stack } from '@mui/material';
import { DeleteConfirmationModal, FormDetailsModal } from '@renderer/components/modals';
import { DataGridTable } from '@renderer/components/Table';
import { ActionsToolbar } from '@renderer/components/toolbars';
import {
  DetailsForm,
  DieuKienXetDuThiForm,
  DinhDangDiemSoForm,
  QuyCheHocVu,
  quyCheHocVuColumns,
  QuyCheHocVuSchema,
} from '@renderer/features/quy-che-hoc-vu';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';
import { FormProvider } from 'react-hook-form';

const defaultValues = {
  id: '',
  maQuyChe: '',
  tenQuyChe: '',
  bieuThuc: '',
  isNienChe: false,
  ghiChu: '',
  dkdT_IsDongHocPhi: false,
  dkdT_IsDiemTBTK: false,
  dkdT_DiemTBTK: undefined,
  dkdT_IsDiemTBTH: false,
  dkdT_DiemTBTH: undefined,
  dkdT_IsKhongVangQua: false,
  dkdT_TongTietVang: undefined,
  dkdT_LyThuyet: undefined,
  dkdT_ThucHanh: undefined,
  dkdT_DuocThiLai: undefined,
  dddS_DiemThanhPhan: undefined,
  dddS_DiemCuoiKy: undefined,
  dddS_DiemTBThuongKy: undefined,
  dddS_DiemTBTH: undefined,
  dddS_DiemTB: undefined,
  dddS_DiemTBHK: undefined,
  dddS_DiemTN: undefined,
  dddS_DiemTK: undefined,
  dddS_KieuLamTron: '',
};

const QuyCheHocVuPage = () => {
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
  } = useCrudPaginationModal<QuyCheHocVu, QuyCheHocVu>({
    defaultValues,
    schema: QuyCheHocVuSchema,
    entity: 'QuyCheHocVu',
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
            exportPaginationToExcel<QuyCheHocVu>({
              entity: 'QuyCheHocVu',
              filteredData: data?.result ?? [],
              columns: quyCheHocVuColumns,
              options: { dataOption, columnOption },
              columnVisibilityModel,
              fileName: 'Danh_sach_quy_che_hoc_vu',
            });
          }}
        />

        {isModalOpen && (
          <FormDetailsModal
            title={isAddMode ? 'Thêm mới quy chế học vụ' : 'Cập nhật quy chế học vụ'}
            onClose={handleCloseModal}
            onSave={onSave}
          >
            <DetailsForm />
            <DieuKienXetDuThiForm />
            <DinhDangDiemSoForm />
          </FormDetailsModal>
        )}
        {isDeleteOpenModal && (
          <DeleteConfirmationModal
            onClose={() => setIsDeleteOpenModal(false)}
            onDelete={handleDeleteRecord}
          />
        )}

        <DataGridTable
          columns={quyCheHocVuColumns}
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

export default QuyCheHocVuPage;
