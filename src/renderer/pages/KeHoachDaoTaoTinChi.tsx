import { Stack } from '@mui/material';
import { DiemAlert } from '@renderer/components/alerts';
import { DeleteConfirmationModal, FormDetailsModal } from '@renderer/components/modals';
import { DataGridTable } from '@renderer/components/Table';
import { ActionsToolbar } from '@renderer/components/toolbars';
import { keHoachDaoTaoTinChiColumns } from '@renderer/features/ke-hoach-dao-tao-tin-chi';
import { KeHoachDaoTaoTinChiModal } from '@renderer/features/ke-hoach-dao-tao-tin-chi/components';
import { KeHoachDaoTaoTinChiFilters } from '@renderer/features/ke-hoach-dao-tao-tin-chi/components/KeHoachDaoTaoTinChiFilters';
import { keHoachDaoTaoTinChiDefaultFilters } from '@renderer/features/ke-hoach-dao-tao-tin-chi/configs/filter.config';
import {
  KeHoachDaoTao_TinChi,
  KeHoachDaoTao_TinChiSchema,
} from '@renderer/features/ke-hoach-dao-tao-tin-chi/validation';
import { ChiTietKhungHocKy_TinChi } from '@renderer/features/lap-chuong-trinh-khung-tin-chi/validation';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { useInsertMutation } from '@renderer/shared/mutations';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';
import { useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { toast } from 'react-toastify';

const defaultValues = {
  idHocKy: undefined,
  ghiChu: undefined,
};

type KeHoachDaoTaoTinChiEntity = KeHoachDaoTao_TinChi & {
  id?: string;
  chiTietChuongTrinhKhung_TinChi: ChiTietKhungHocKy_TinChi;
};

const KeHoachDaoTaoTinChiPage = () => {
  const [selectedKhungHocKyTC, setSelectedKhungHocKyTC] = useState<ChiTietKhungHocKy_TinChi[]>([]);
  const { mutateAsync } = useInsertMutation('KeHoachDaoTao_TinChi/multiple');

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
    isAddMode,
    tableConfig,
    columnVisibilityModel,
    mergeParams,
  } = useCrudPaginationModal<KeHoachDaoTaoTinChiEntity, KeHoachDaoTao_TinChi>({
    defaultValues,
    schema: KeHoachDaoTao_TinChiSchema,
    entity: 'KeHoachDaoTao_TinChi',
    beforeSubmit: (values) => {
      if (selectedKhungHocKyTC.length === 0) {
        toast.error('Vui lòng chọn ít nhất một khung học kỳ tín chỉ');
        return;
      }
      const payload = selectedKhungHocKyTC.map((item) => ({
        idChiTietKhungHocKy_TinChi: item.id,
        idHocKy: values.idHocKy,
        ghiChu: values.ghiChu,
      }));

      return payload as any;
    },
    handleAdd: mutateAsync,
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
                ? 'Thêm mới kế hoạch đào tạo - tín chỉ'
                : 'Cập nhật kế hoạch đào tạo - tín chỉ'
            }
            onClose={handleCloseModal}
            onSave={onSave}
          >
            <KeHoachDaoTaoTinChiModal
              selectedKhungHocKyTC={selectedKhungHocKyTC}
              setSelectedKhungHocKyTC={setSelectedKhungHocKyTC}
            />
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
          onExport={(dataOption, columnOption) => {
            exportPaginationToExcel<KeHoachDaoTaoTinChiEntity>({
              entity: 'KeHoachDaoTao_TinChi',
              filteredData: data?.result ?? [],
              columns: keHoachDaoTaoTinChiColumns,
              options: { dataOption, columnOption },
              columnVisibilityModel,
              fileName: 'Danh_sach_ke_hoach_dao_tao_tin_chi',
            });
          }}
        />

        <DiemAlert sx={{ my: 1, pl: 1, py: 0 }} />
        <KeHoachDaoTaoTinChiFilters
          onApply={mergeParams}
          onClear={() => {
            mergeParams(keHoachDaoTaoTinChiDefaultFilters);
          }}
        />
        <DataGridTable
          columns={keHoachDaoTaoTinChiColumns}
          rows={data?.result}
          getRowId={(row) => row.id}
          loading={isRefetching}
          onRowSelectionModelChange={handleRowSelectionModelChange}
          rowSelectionModel={selectedRows}
          onRowClick={(params) => formMethods.reset(params.row)}
          height={'calc(100% - 85px)'}
          {...tableConfig}
        />
      </Stack>
    </FormProvider>
  );
};

export default KeHoachDaoTaoTinChiPage;
