import { Stack } from '@mui/material';
import { DeleteConfirmationModal, FormDetailsModal } from '@renderer/components/modals';
import { DataGridTable } from '@renderer/components/Table';
import { ActionsToolbar } from '@renderer/components/toolbars';
import { columns } from '@renderer/features/ktx-management/chi-so-dien-nuoc/configs/table.configs';
import { ChiSoDienNuocFilter } from '@renderer/features/ktx-management/chi-so-dien-nuoc/components/ChiSoDienNuocFilter';
import { ChiSoDienNuocForm } from '@renderer/features/ktx-management/chi-so-dien-nuoc/components/ChiSoDienNuocForm';
import {
  chiSoDienNuocSchema,
  defaultValues,
} from '@renderer/features/ktx-management/chi-so-dien-nuoc/validation';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';
import { FormProvider } from 'react-hook-form';
import { useMemo } from 'react';
import dayjs from 'dayjs';

export default function DanhSachChiSoDienNuoc() {
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
  } = useCrudPaginationModal({
    defaultValues,
    schema: chiSoDienNuocSchema,
    entity: 'ChiSoDienNuoc',
    beforeEdit: (row: any) => {
      return {
        ...row,
        dienCu: row.dienMoi,
        nuocCu: row.nuocMoi,
        dienMoi: 0,
        nuocMoi: 0,
        daChot: false,
      };
    },
    beforeSubmit: (formData) => {
      const dayjsDate = dayjs(formData.thangNam);
      return {
        id: formData.id,
        toaNhaId: formData.toaNhaId,
        phongKtxId: formData.phongKtxId,
        thangNam: formData.thangNam,
        dienCu: formData.dienCu,
        dienMoi: formData.dienMoi,
        nuocCu: formData.nuocCu,
        nuocMoi: formData.nuocMoi,
        daChot: formData.daChot,
        thang: dayjsDate.month() + 1,
        nam: dayjsDate.year(),
      } as any;
    },
  });

  const rows = useMemo(() => {
    const result = data?.data ?? [];
    return result.map((item: any) => ({
      id: item.id,
      tenToaNha: item.tenToaNha || '',
      maPhong: item.maPhong || '',
      thang: item.thang,
      nam: item.nam,
      thangNam: item.thangNam || `Tháng ${item.thang}/${item.nam}`,
      dienCu: item.dienCu,
      dienMoi: item.dienMoi,
      tieuThuDien: item.tieuThuDien || item.dienMoi - item.dienCu,
      nuocCu: item.nuocCu,
      nuocMoi: item.nuocMoi,
      tieuThuNuoc: item.tieuThuNuoc || item.nuocMoi - item.nuocCu,
      daChot: item.daChot,
    }));
  }, [data]);

  return (
    <FormProvider {...formMethods}>
      <Stack height="100%" width="100%" p={2}>
        <ActionsToolbar
          selectedRowIds={selectedRows}
          onDelete={() => setIsDeleteOpenModal(true)}
          onAdd={onAdd}
          onEdit={onEdit}
          onExport={(dataOption, columnOption) => {
            exportPaginationToExcel({
              entity: 'ChiSoDienNuoc',
              filteredData: rows,
              columns,
              options: { dataOption, columnOption },
              columnVisibilityModel: {},
              fileName: 'danh_sach_chi_so_dien_nuoc',
            });
          }}
        />

        {isModalOpen && (
          <FormDetailsModal
            title={isAddMode ? 'Thêm mới chỉ số điện nước' : 'Chỉnh sửa chỉ số điện nước'}
            onClose={handleCloseModal}
            onSave={onSave}
            maxWidth="md"
          >
            <ChiSoDienNuocForm />
          </FormDetailsModal>
        )}

        {isDeleteOpenModal && (
          <DeleteConfirmationModal
            onClose={() => setIsDeleteOpenModal(false)}
            onDelete={handleDeleteRecord}
          />
        )}

        <ChiSoDienNuocFilter onApply={(value) => mergeParams(value)} />

        <DataGridTable
          columns={columns}
          rows={rows}
          checkboxSelection
          loading={isRefetching}
          onRowClick={(params) => formMethods.reset(params.row)}
          onRowSelectionModelChange={handleRowSelectionModelChange}
          rowSelectionModel={selectedRows}
          height="calc(100% - 85px)"
          {...tableConfig}
        />
      </Stack>
    </FormProvider>
  );
}
