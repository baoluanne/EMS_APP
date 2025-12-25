import { Stack } from '@mui/material';
import { DeleteConfirmationModal, FormDetailsModal } from '@renderer/components/modals';
import { ActionsToolbar } from '@renderer/components/toolbars';
import DSSVHocNganh2FilterForm from '@renderer/features/hoc-vu-sinh-vien/danh-sach-sinh-vien-hoc-nganh-2/components/DSSVHocNganh2FilterForm';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import {
  defaultDsSinhVienHocNganh2FilterState,
  dangKyNganh2ValidationSchema,
  dsSinhVienHocNganh2ColumnGroupingModel,
  dsSinhVienHocNganh2Columns,
  sinhVienHocNganh2FilterSchema,
  SinhVienHocNganh2Filter,
  DangKyNganh2FormData,
  defaultDangKyNganh2FormDataState,
} from '@renderer/features/hoc-vu-sinh-vien/danh-sach-sinh-vien-hoc-nganh-2';
import { DataGridTable } from '@renderer/components/Table';
import DangKyHocNganh2Form from '@renderer/features/hoc-vu-sinh-vien/danh-sach-sinh-vien-hoc-nganh-2/components/DangKyHocNganh2Form';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export default function DangKyHocPhanNganh2() {
  const {
    formMethods,
    data,
    isModalOpen,
    isRefetching,
    handleRowSelectionModelChange,
    isDeleteOpenModal,
    onAdd,
    onSave,
    handleDeleteRecord,
    selectedRows,
    setIsDeleteOpenModal,
    handleCloseModal,
    tableConfig,
    columnVisibilityModel,
    mergeParams,
  } = useCrudPaginationModal<DangKyNganh2FormData, DangKyNganh2FormData>({
    defaultValues: defaultDangKyNganh2FormDataState,
    schema: dangKyNganh2ValidationSchema,
    entity: 'SinhVienNganh2',
  });

  const filterMethods = useForm<SinhVienHocNganh2Filter>({
    resolver: zodResolver(sinhVienHocNganh2FilterSchema),
    defaultValues: defaultDsSinhVienHocNganh2FilterState,
  });

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
      {isDeleteOpenModal && (
        <DeleteConfirmationModal
          onClose={() => setIsDeleteOpenModal(false)}
          onDelete={handleDeleteRecord}
        />
      )}
      {isModalOpen && (
        <FormProvider {...formMethods}>
          <FormDetailsModal
            title={'Đăng ký học ngành 2'}
            onClose={handleCloseModal}
            onSave={onSave}
          >
            <DangKyHocNganh2Form />
          </FormDetailsModal>
        </FormProvider>
      )}
      <ActionsToolbar
        selectedRowIds={selectedRows}
        onAdd={onAdd}
        onDelete={() => setIsDeleteOpenModal(true)}
        onExport={(dataOption, columnOption) => {
          exportPaginationToExcel<DangKyNganh2FormData>({
            entity: 'dangKyNganh2ValidationSchema',
            filteredData: data?.result ?? [],
            columns: dsSinhVienHocNganh2Columns,
            options: { dataOption, columnOption },
            columnVisibilityModel,
            fileName: 'Danh_sach_sinh_vien_hoc_nganh_2',
          });
        }}
      />

      <FormProvider {...filterMethods}>
        <DSSVHocNganh2FilterForm
          methods={filterMethods}
          onApply={(values) => mergeParams({ ...values })}
        />
      </FormProvider>

      <DataGridTable
        columns={dsSinhVienHocNganh2Columns}
        columnGroupingModel={dsSinhVienHocNganh2ColumnGroupingModel}
        rows={data?.result}
        checkboxSelection
        loading={isRefetching}
        onRowClick={(params) => formMethods.reset(params.row)}
        onRowSelectionModelChange={handleRowSelectionModelChange}
        rowSelectionModel={selectedRows}
        height={'calc(100% - 85px)'}
        {...tableConfig}
      />
    </Stack>
  );
}
