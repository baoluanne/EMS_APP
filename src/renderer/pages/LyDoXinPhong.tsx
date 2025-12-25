import { Stack } from '@mui/material';
import { DeleteConfirmationModal, FormDetailsModal } from '@renderer/components/modals';
import { DataGridTable } from '@renderer/components/Table';
import { ActionsToolbar } from '@renderer/components/toolbars';
import { Filters } from '@renderer/components/filters';
import { lyDoXinPhongColumns, LyDoXinPhongForm } from '@renderer/features/ly-do-xin-phong';
import { LyDoXinPhong, LyDoXinPhongSchema } from '@renderer/features/ly-do-xin-phong/validations';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';
import { FormProvider } from 'react-hook-form';

const LyDoXinPhongPage = () => {
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
  } = useCrudPaginationModal<LyDoXinPhong, LyDoXinPhong>({
    defaultValues: {},
    schema: LyDoXinPhongSchema,
    entity: 'LyDoXinPhong',
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
            title={isAddMode ? 'Thêm mới lý do xin phòng' : 'Cập nhật lý do xin phòng'}
            onClose={handleCloseModal}
            onSave={onSave}
            maxWidth="md"
          >
            <LyDoXinPhongForm />
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
            exportPaginationToExcel<LyDoXinPhong>({
              entity: 'LyDoXinPhong',
              filteredData: data?.result ?? [],
              columns: lyDoXinPhongColumns,
              options: { dataOption, columnOption },
              columnVisibilityModel,
              fileName: 'Danh_sach_ly_do_xin_phong',
            });
          }}
        />
        <Filters onApply={(values) => mergeParams(values)} />

        <DataGridTable
          height={300}
          columns={lyDoXinPhongColumns}
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

export default LyDoXinPhongPage;
