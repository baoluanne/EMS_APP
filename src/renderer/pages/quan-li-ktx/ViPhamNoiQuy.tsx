import { Stack } from '@mui/material';
import { FormProvider } from 'react-hook-form';
import { DataGridTable } from '@renderer/components/Table';
import { DeleteConfirmationModal, FormDetailsModal } from '@renderer/components/modals';
import { ActionsToolbar } from '@renderer/components/toolbars';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import React, { useCallback } from 'react';
import { TITLE_MODE } from '@renderer/shared/enums';
import { ViPhamNoiQuyForm } from '../../features/ktx-management/vi-pham-noi-quy/components/vi-pham-noi-quy-form';
import { ViPhamNoiQuyFilter } from '../../features/ktx-management/vi-pham-noi-quy/components/vi-pham-noi-quy-filter';
import { viPhamNoiQuyColumns as columns } from '../../features/ktx-management/vi-pham-noi-quy/configs/table.configs';
import {
  ViPhamNoiQuy,
  viPhamNoiQuySchema,
  ViPhamNoiQuyFilterState,
  LoaiViPhamNoiQuy,
} from '../../features/ktx-management/vi-pham-noi-quy/validation';

const defaultValues: Partial<ViPhamNoiQuy> = {
  sinhVienId: '',
  loaiViPham: LoaiViPhamNoiQuy.GayMatTratTu,
  noiDungViPham: '',
  diemTru: 0,
  ngayViPham: new Date(),
  // lanViPham: 1 -> Đã xóa để BE tự tính, fix lỗi TS2561
};

const ViPhamNoiQuyPage = () => {
  const [filters, setFilters] = React.useState<ViPhamNoiQuyFilterState>({});

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
    mergeParams,
  } = useCrudPaginationModal<ViPhamNoiQuy, ViPhamNoiQuy>({
    defaultValues: defaultValues as any,
    schema: viPhamNoiQuySchema,
    entity: 'ViPhamNoiQuyKTX',
    defaultState: filters,
    beforeSubmit: (values) => ({
      ...values,
      maBienBan: values.id ? values.maBienBan : undefined,
    }),
  });

  const handleFilterApply = useCallback(
    (val: ViPhamNoiQuyFilterState) => {
      setFilters(val);
      mergeParams(val);
    },
    [mergeParams],
  );

  return (
    <FormProvider {...formMethods}>
      <Stack height="100%" width="100%" p={2}>
        <ActionsToolbar
          selectedRowIds={selectedRows}
          onDelete={() => setIsDeleteOpenModal(true)}
          onAdd={onAdd}
          onEdit={onEdit}
        />

        {isModalOpen && (
          <FormDetailsModal
            title={isAddMode ? 'Lập biên bản vi phạm' : 'Cập nhật biên bản'}
            onClose={handleCloseModal}
            onSave={onSave}
            maxWidth="md"
            titleMode={TITLE_MODE.COLORED}
          >
            <ViPhamNoiQuyForm />
          </FormDetailsModal>
        )}

        {isDeleteOpenModal && (
          <DeleteConfirmationModal
            onClose={() => setIsDeleteOpenModal(false)}
            onDelete={handleDeleteRecord}
          />
        )}

        <ViPhamNoiQuyFilter onApply={handleFilterApply} onReset={() => mergeParams({})} />

        <DataGridTable
          columns={columns}
          rows={data?.result ?? []}
          checkboxSelection
          loading={isRefetching}
          getRowId={(row) => row.id!}
          onRowSelectionModelChange={handleRowSelectionModelChange}
          rowSelectionModel={selectedRows}
          height="calc(100% - 110px)"
          {...tableConfig}
        />
      </Stack>
    </FormProvider>
  );
};

export default ViPhamNoiQuyPage;
