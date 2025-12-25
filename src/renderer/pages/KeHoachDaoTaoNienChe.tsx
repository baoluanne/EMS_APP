import { Stack } from '@mui/material';
import { DiemAlert } from '@renderer/components/alerts';
import { DeleteConfirmationModal, FormDetailsModal } from '@renderer/components/modals';
import { DataGridTable } from '@renderer/components/Table';
import { ActionsToolbar } from '@renderer/components/toolbars';
import {
  keHoachDaoTaoNienCheColumns,
  keHoachDaoTaoNienCheDefaultFilters,
} from '@renderer/features/ke-hoach-dao-tao-nien-che';
import { KeHoachDaoTaoNienCheModal } from '@renderer/features/ke-hoach-dao-tao-nien-che/components';
import { KeHoachDaoTaoNienCheFilters } from '@renderer/features/ke-hoach-dao-tao-nien-che/components/KeHoachDaoTaoNienCheFilters';
import {
  ChiTietKhungHocKy_NienChe,
  KeHoachDaoTao_NienChe,
  KeHoachDaoTao_NienCheSchema,
} from '@renderer/features/ke-hoach-dao-tao-nien-che/validation';
import { ChiTietChuongTrinhKhung_NienChe } from '@renderer/features/lap-chuong-trinh-khung-nien-che/validation';
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

type KeHoachDaoTaoNienCheEntity = KeHoachDaoTao_NienChe & {
  id?: string;
  chiTietChuongTrinhKhung_NienChe: ChiTietChuongTrinhKhung_NienChe;
};

const KeHoachDaoTaoNienChePage = () => {
  const [selectedKhungHocKyTC, setSelectedKhungHocKyTC] = useState<ChiTietKhungHocKy_NienChe[]>([]);
  const { mutateAsync } = useInsertMutation('KeHoachDaoTao_NienChe/multiple');

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
  } = useCrudPaginationModal<KeHoachDaoTaoNienCheEntity, KeHoachDaoTao_NienChe>({
    defaultValues,
    schema: KeHoachDaoTao_NienCheSchema,
    entity: 'KeHoachDaoTao_NienChe',
    beforeSubmit: (values) => {
      if (selectedKhungHocKyTC.length === 0) {
        toast.error('Vui lòng chọn ít nhất một khung học kỳ niên chế');
        return;
      }
      const payload = selectedKhungHocKyTC.map((item) => ({
        idChiTietKhungHocKy_NienChe: item.id,
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
                ? 'Thêm mới kế hoạch đào tạo - niên chế'
                : 'Cập nhật kế hoạch đào tạo - niên chế'
            }
            onClose={handleCloseModal}
            onSave={onSave}
          >
            <KeHoachDaoTaoNienCheModal
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
            exportPaginationToExcel<KeHoachDaoTaoNienCheEntity>({
              entity: 'KeHoachDaoTao_NienChe',
              filteredData: data?.result ?? [],
              columns: keHoachDaoTaoNienCheColumns,
              options: { dataOption, columnOption },
              columnVisibilityModel,
              fileName: 'Danh_sach_ke_hoach_dao_tao_nien_che',
            });
          }}
        />

        <DiemAlert sx={{ my: 1, pl: 1, py: 0 }} />
        <KeHoachDaoTaoNienCheFilters
          onApply={mergeParams}
          onClear={() => {
            mergeParams(keHoachDaoTaoNienCheDefaultFilters);
          }}
        />
        <DataGridTable
          columns={keHoachDaoTaoNienCheColumns}
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

export default KeHoachDaoTaoNienChePage;
