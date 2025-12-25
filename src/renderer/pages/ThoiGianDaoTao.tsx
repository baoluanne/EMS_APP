import { Stack } from '@mui/material';
import { Filters } from '@renderer/components/filters/Filters';
import { DeleteConfirmationModal, FormDetailsModal } from '@renderer/components/modals';
import { DataGridTable } from '@renderer/components/Table';
import { ActionsToolbar } from '@renderer/components/toolbars';
import {
  thoiGianDaoTaoColumns,
  ThoiGianDaoTaoForm,
  ThoiGianDaoTao,
  ThoiGianDaoTaoSchema,
  defaultThoiGianDaoTao,
} from '@renderer/features/thoi-gian-dao-tao';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';
import { FormProvider } from 'react-hook-form';

const ThoiGianDaoTaoPage = () => {
  const {
    formMethods: methodsCrud,
    data,
    isRefetching,
    selectedRows,
    handleRowSelectionModelChange,
    isModalOpen,
    isDeleteOpenModal,
    onAdd,
    onEdit,
    onSave,
    handleDeleteRecord,
    setIsDeleteOpenModal,
    handleCloseModal,
    isAddMode,
    tableConfig,
    columnVisibilityModel,
    mergeParams,
  } = useCrudPaginationModal<ThoiGianDaoTao, ThoiGianDaoTao>({
    defaultValues: defaultThoiGianDaoTao,
    schema: ThoiGianDaoTaoSchema,
    entity: 'ThoiGianDaoTao',
  });

  return (
    <FormProvider {...methodsCrud}>
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
            title={isAddMode ? 'Thêm mới thời gian đào tạo' : 'Cập nhật thời gian đào tạo'}
            onClose={handleCloseModal}
            onSave={onSave}
          >
            <ThoiGianDaoTaoForm />
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
            exportPaginationToExcel<ThoiGianDaoTao>({
              entity: 'ThoiGianDaoTao',
              filteredData: data?.result ?? [],
              columns: thoiGianDaoTaoColumns,
              options: { dataOption, columnOption },
              columnVisibilityModel,
              fileName: 'Danh_sach_thoi_gian_dao_tao',
            });
          }}
        />

        {/* <DiemAlert sx={{ my: 1, pl: 1, py: 0 }} /> */}
        <Filters onApply={(values) => mergeParams(values)} />

        <DataGridTable
          columns={thoiGianDaoTaoColumns}
          height={300}
          rows={data?.result}
          getRowId={(row) => row.id}
          loading={isRefetching}
          onRowClick={(params) => methodsCrud.reset(params.row)}
          onRowSelectionModelChange={handleRowSelectionModelChange}
          rowSelectionModel={selectedRows}
          checkboxSelection
          {...tableConfig}
        />
        {/* <ThoiGianDaoTaoFilter onApply={(values) => mergeParams(values)} /> */}
      </Stack>
    </FormProvider>
  );
};

export default ThoiGianDaoTaoPage;
