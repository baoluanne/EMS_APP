import { Stack } from '@mui/material';
import { DeleteConfirmationModal, FormDetailsModal } from '@renderer/components/modals';
import { DataGridTable } from '@renderer/components/Table';
import { ActionsToolbar } from '@renderer/components/toolbars';
import { Filters } from '@renderer/components/filters';
import {
  HinhThucXuLyViPhamQuyCheThiForm,
  HinhThucXuLyViPhamQuyCheThiSchema,
  HinhThucXuLyViPhamViCheThiColumns,
  HinhThucXuLyVPQCThi,
} from '@renderer/features/hinh-thuc-xu-ly-vi-pham-quy-che-thi';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';
import { FormProvider } from 'react-hook-form';

const HinhThucXuLyViPhamViCheThiPage = () => {
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
  } = useCrudPaginationModal<HinhThucXuLyVPQCThi, HinhThucXuLyVPQCThi>({
    defaultValues: {},
    schema: HinhThucXuLyViPhamQuyCheThiSchema,
    entity: 'HinhThucXuLyVPQCThi',
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
              isAddMode
                ? 'Thêm mới hình thức xử lý vi phạm quy chế thi'
                : 'Cập nhật hình thức xử lý vi phạm quy chế thi'
            }
            onClose={handleCloseModal}
            onSave={onSave}
          >
            <HinhThucXuLyViPhamQuyCheThiForm />
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
            exportPaginationToExcel<HinhThucXuLyVPQCThi>({
              entity: 'HinhThucXuLyVPQCThi',
              filteredData: data?.result ?? [],
              columns: HinhThucXuLyViPhamViCheThiColumns,
              options: { dataOption, columnOption },
              columnVisibilityModel,
              fileName: 'Danh_sach_hinh_thuc_xu_ly_vi_pham_quy_che_thi',
            });
          }}
        />
        <Filters onApply={(values) => mergeParams(values)} />

        <DataGridTable
          height={300}
          columns={HinhThucXuLyViPhamViCheThiColumns}
          rows={data?.result}
          rowSelectionModel={selectedRows}
          onRowSelectionModelChange={handleRowSelectionModelChange}
          checkboxSelection
          loading={isRefetching}
          onRowClick={(params) => formMethods.reset(params.row)}
          getRowId={(row) => row.id}
          {...tableConfig}
        />
      </Stack>
    </FormProvider>
  );
};

export default HinhThucXuLyViPhamViCheThiPage;
