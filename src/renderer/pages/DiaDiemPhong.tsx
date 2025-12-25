import { Stack } from '@mui/material';
import { Filters } from '@renderer/components/filters';
import { DeleteConfirmationModal, FormDetailsModal } from '@renderer/components/modals';
import { DataGridTable } from '@renderer/components/Table';
import { ActionsToolbar } from '@renderer/components/toolbars';
import {
  DiaDiemPhong,
  diaDiemPhongColumns,
  DiaDiemPhongForm,
  diaDiemPhongSchema,
} from '@renderer/features/dia-diem-phong';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';
import { FormProvider } from 'react-hook-form';

const defaultFormValues = {
  id: undefined,
  maDDPhong: undefined,
  tenNhomDDPhong: undefined,
  diaChi: undefined,
  idCoSoDaoTao: undefined,
  diaDiem: undefined,
  banKinh: undefined,
  ghiChu: undefined,
  coSoDaoTao: undefined,
};

const DiaDiemPhongPage = () => {
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
  } = useCrudPaginationModal<DiaDiemPhong, DiaDiemPhong>({
    defaultValues: defaultFormValues,
    schema: diaDiemPhongSchema,
    entity: 'DiaDiemPhong',
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
            exportPaginationToExcel<DiaDiemPhong>({
              entity: 'DiaDiemPhong',
              filteredData: data?.result ?? [],
              columns: diaDiemPhongColumns,
              options: { dataOption, columnOption },
              columnVisibilityModel,
              fileName: 'Danh_sach_dia_diem_phong',
            });
          }}
        />
        {isModalOpen && (
          <FormDetailsModal
            title={isAddMode ? 'Thêm mới địa điểm phòng' : 'Cập nhật địa điểm phòng'}
            onClose={handleCloseModal}
            onSave={onSave}
          >
            <DiaDiemPhongForm />
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
          columns={diaDiemPhongColumns}
          rows={data?.result}
          getRowId={(row) => row.id}
          columnGroupHeaderHeight={28}
          columnHeaderHeight={40}
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

export default DiaDiemPhongPage;
