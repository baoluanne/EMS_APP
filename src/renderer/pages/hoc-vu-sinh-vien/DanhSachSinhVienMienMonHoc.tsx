import { Stack } from '@mui/material';
import { DeleteConfirmationModal, FormDetailsModal } from '@renderer/components/modals';
import { DataGridTable } from '@renderer/components/Table';
import { ActionsToolbar } from '@renderer/components/toolbars';
import {
  columns,
  danhSachKetQuaImportMienMonHocColumns,
  DanhSachMienMonHocFilters,
  NhapSinhVienMienMonHocForm,
  NhapSinhVienMienMonHocFormRef,
  SinhVienMienMonHocFilter,
  sinhVienMienMonHocFilterSchema,
} from '@renderer/features/hoc-vu-sinh-vien/quan-ly-sinh-vien/ds-sinh-vien-mien-mon-hoc';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { useInsertMutation } from '@renderer/shared/mutations';
import { BaseResponse } from '@renderer/shared/types';
import { useRef } from 'react';
import { FormProvider } from 'react-hook-form';
import { toast } from 'react-toastify';
const DanhSachSinhVienMienMonHocPage = () => {
  const {
    formMethods,
    data,
    isModalOpen,
    isRefetching,
    handleRowSelectionModelChange,
    isDeleteOpenModal,
    onAdd,
    handleDeleteRecord,
    selectedRows,
    setIsDeleteOpenModal,
    handleCloseModal,
    tableConfig,
    mergeParams,
    refetch,
  } = useCrudPaginationModal<SinhVienMienMonHocFilter, SinhVienMienMonHocFilter>({
    defaultValues: {},
    schema: sinhVienMienMonHocFilterSchema,
    entity: 'SinhVienMienMonHoc',
  });
  const nhapFormRef = useRef<NhapSinhVienMienMonHocFormRef>(null);
  const { mutateAsync: bulkCreateAsync } = useInsertMutation<BaseResponse<string>>(
    'SinhVienMienMonHoc/bulk-create',
  );

  const handleSaveSinhVienMienMonHoc = async () => {
    const formData = nhapFormRef.current?.getFormDataToSave();
    if (!formData) {
      return;
    }

    try {
      const result = await bulkCreateAsync(formData);
      if (result.isSuccess) {
        toast.success('Lưu miễn môn học thành công!');
        handleCloseModal();
        refetch();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Lỗi khi lưu miễn môn học:', error);
      toast.error('Đã xảy ra lỗi.');
    }
  };

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
            title={'Nhập sinh viên được miễn môn học'}
            onClose={handleCloseModal}
            onSave={handleSaveSinhVienMienMonHoc}
            maxWidth="lg"
          >
            <NhapSinhVienMienMonHocForm ref={nhapFormRef} />
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
          onImport={{
            title: 'Import danh sách miễn môn',
            columns: danhSachKetQuaImportMienMonHocColumns,
            entity: 'SinhVienMienMonHoc',
            onSuccess: refetch,
            sampleFilePath: '/samples/DanhSachSinhVienMienMonHoc_Sample.xlsx',
            buttonTitle: 'Import danh sách miễn môn',
          }}
        />
        <DanhSachMienMonHocFilters onApply={(values) => mergeParams(values)} methods={formMethods} />

        <DataGridTable
          height={300}
          columns={columns}
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

export default DanhSachSinhVienMienMonHocPage;
