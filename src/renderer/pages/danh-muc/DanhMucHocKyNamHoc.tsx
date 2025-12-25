import { Divider, Stack } from '@mui/material';
import { Filters } from '@renderer/components/filters';
import { DeleteConfirmationModal, FormDetailsModal } from '@renderer/components/modals';
import { DataGridTable } from '@renderer/components/Table';
import { HocKy, hocKyColumns, HocKyForm, HocKySchema } from '@renderer/features/danh-muc/hoc-ky';
import { TitleWithToolbar } from '@renderer/features/danh-muc/hoc-ky-nam-hoc/components/TitleWithToolbar';
import {
  namHocColumns,
  NamHocForm,
  NamHocSchema,
  namHocSchema,
} from '@renderer/features/danh-muc/nam-hoc';

import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';
import { useEffect } from 'react';
import { FormProvider } from 'react-hook-form';
import { toast } from 'react-toastify';

const DanhMucHocKyNamHocPage = () => {
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
  } = useCrudPaginationModal<NamHocSchema, NamHocSchema>({
    defaultValues: {},
    schema: namHocSchema,
    entity: 'NamHoc',
  });
  const {
    formMethods: hockyMethods,
    data: hocKyData,
    isModalOpen: isModalOpenHK,
    isRefetching: isRefetchingHK,
    handleRowSelectionModelChange: handleRowSelectionModelChangeHK,
    isDeleteOpenModal: isDeleteOpenModalHK,
    onAdd: onAddHK,
    onEdit: onEditHK,
    onSave: onSaveHK,
    handleDeleteRecord: handleDeleteRecordHK,
    selectedRows: selectedRowsHK,
    setIsDeleteOpenModal: setIsDeleteOpenModalHK,
    handleCloseModal: handleCloseModalHK,
    isAddMode: isAddModeHK,
    tableConfig: tableConfigHK,
    mergeParams: mergeParamsHK,
    columnVisibilityModel: columnVisibilityModelHK,
  } = useCrudPaginationModal<HocKy, HocKy>({
    defaultValues: {},
    schema: HocKySchema,
    entity: 'HocKy',
  });

  useEffect(() => {
    const selectedIds = Array.from(selectedRows?.ids ?? []);
    const idNamHocs = selectedIds.length > 0 ? selectedIds.join(',') : null;
    mergeParamsHK({ idNamHoc: idNamHocs });
  }, [selectedRows, mergeParamsHK]);

  useEffect(() => {
    if (isModalOpenHK) {
      const selectedIds = Array.from(selectedRows?.ids ?? []);
      if (selectedIds.length === 1) {
        hockyMethods.setValue('idNamHoc', selectedIds[0].toString());
      }
    }
  }, [isModalOpenHK, selectedRows, hockyMethods]);

  const handleAddHK = () => {
    const selectedIds = Array.from(selectedRows?.ids ?? []);
    if (selectedIds.length !== 1) {
      toast.warning('Vui lòng chọn 1 năm học');
      return;
    }
    onAddHK();
  };
  return (
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
      <FormProvider {...formMethods}>
        {/* Danh sách năm học */}
        {isDeleteOpenModal && (
          <DeleteConfirmationModal
            onClose={() => setIsDeleteOpenModal(false)}
            onDelete={handleDeleteRecord}
          />
        )}
        {isModalOpen && (
          <FormDetailsModal
            title={isAddMode ? 'Thêm mới danh mục năm học' : 'Cập nhật danh mục năm học'}
            onClose={handleCloseModal}
            onSave={onSave}
          >
            <NamHocForm />
          </FormDetailsModal>
        )}
        <TitleWithToolbar
          title="Danh sách năm học"
          selectedRows={selectedRows}
          onAdd={onAdd}
          onEdit={onEdit}
          setIsDeleteOpenModal={() => setIsDeleteOpenModal(true)}
          onExport={(dataOption, columnOption) => {
            exportPaginationToExcel<NamHocSchema>({
              entity: 'NamHoc',
              filteredData: data?.result ?? [],
              columns: namHocColumns,
              options: { dataOption, columnOption },
              columnVisibilityModel,
              fileName: 'Danh_sach_danh_muc_nam_hoc',
            });
          }}
          onImport={null}
        />
        <Filters onApply={(values) => mergeParams(values)} />
        <DataGridTable
          height={800}
          columns={namHocColumns}
          rows={data?.result}
          checkboxSelection
          getRowId={(row) => row.id}
          loading={isRefetching}
          onRowClick={(params) => formMethods.reset(params.row)}
          onRowSelectionModelChange={handleRowSelectionModelChange}
          rowSelectionModel={selectedRows}
          {...tableConfig}
        />
      </FormProvider>
      <Divider sx={{ my: 2 }} />
      {/* Danh sách học kỳ */}
      <FormProvider {...hockyMethods}>
        {isDeleteOpenModalHK && (
          <DeleteConfirmationModal
            onClose={() => setIsDeleteOpenModalHK(false)}
            onDelete={handleDeleteRecordHK}
          />
        )}
        {isModalOpenHK && (
          <FormDetailsModal
            title={isAddModeHK ? 'Thêm mới danh mục học kỳ' : 'Cập nhật danh mục học kỳ'}
            onClose={handleCloseModalHK}
            onSave={onSaveHK}
          >
            <HocKyForm />
          </FormDetailsModal>
        )}
        <TitleWithToolbar
          title="Danh sách học kỳ"
          selectedRows={selectedRowsHK}
          onAdd={handleAddHK}
          onEdit={onEditHK}
          setIsDeleteOpenModal={() => setIsDeleteOpenModalHK(true)}
          onExport={(dataOption, columnOption) => {
            exportPaginationToExcel<HocKy>({
              entity: 'HocKy',
              filteredData: hocKyData?.result ?? [],
              columns: hocKyColumns,
              options: { dataOption, columnOption },
              columnVisibilityModel: columnVisibilityModelHK,
              fileName: 'Danh_sach_danh_muc_hoc_ky',
            });
          }}
          onImport={null}
        />
        <Filters onApply={(values) => mergeParamsHK(values)} />
        <DataGridTable
          height={800}
          columns={hocKyColumns}
          rows={hocKyData?.result}
          checkboxSelection
          getRowId={(row) => row.id}
          loading={isRefetchingHK}
          onRowClick={(params) => hockyMethods.reset(params.row)}
          onRowSelectionModelChange={handleRowSelectionModelChangeHK}
          rowSelectionModel={selectedRowsHK}
          {...tableConfigHK}
        />
      </FormProvider>
    </Stack>
  );
};

export default DanhMucHocKyNamHocPage;
