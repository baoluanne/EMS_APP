import { Stack } from '@mui/material';
import { GridRowParams } from '@mui/x-data-grid';
import { DiemAlert } from '@renderer/components/alerts';
import { DeleteConfirmationModal, FormDetailsModal } from '@renderer/components/modals';
import { DataGridTable } from '@renderer/components/Table';
import { ActionsToolbar } from '@renderer/components/toolbars';
import {
  defaultChuongTrinhKhungNienCheFilters,
  quanLyChuongTrinhKhungNienCheColumns,
  QuanLyChuongTrinhKhungNienCheFilter,
} from '@renderer/features/quan-ly-chuong-trinh-khung-nien-che';
import LapChuongTrinhKhungNienCheModal from '@renderer/features/quan-ly-chuong-trinh-khung-nien-che/components/LapChuongTrinhKhungNienCheModal';
import {
  ChuongTrinhKhungNienChe,
  ChuongTrinhKhungNienCheSchema,
  LopHocCTKNienCheSchema,
  LopHocCTKNienCheType,
} from '@renderer/features/quan-ly-chuong-trinh-khung-nien-che/validations';
import { defaultChuongTrinhKhungTinChiFilters } from '@renderer/features/quan-ly-chuong-trinh-khung-tin-chi';
import { lopHocColumns } from '@renderer/features/quan-ly-chuong-trinh-khung-tin-chi/configs/lophoc.table.config';
import { useUpsertModal } from '@renderer/shared/hooks';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';
import { useState } from 'react';
import { FormProvider } from 'react-hook-form';

const QuanLyChuongTrinhKhungNienChe = () => {
  const { handleOpenModal, isModalOpen, handleCloseModal } = useUpsertModal();
  const [isAddMode, SetIsAddMode] = useState<boolean>(true);
  const [selectedData, setSelectedData] = useState<ChuongTrinhKhungNienChe>();
  const [enabled, setEnabled] = useState<boolean>(false);
  const {
    formMethods,
    data,
    isRefetching,
    handleRowSelectionModelChange,
    isDeleteOpenModal,
    handleDeleteRecord,
    selectedRows,
    setIsDeleteOpenModal,
    refetch,
    tableConfig,
    columnVisibilityModel,
    mergeParams,
  } = useCrudPaginationModal<ChuongTrinhKhungNienChe, ChuongTrinhKhungNienChe>({
    defaultValues: {},
    schema: ChuongTrinhKhungNienCheSchema,
    entity: 'ChuongTrinhKhungNienChe',
  });

  const handleClickRow = (params: GridRowParams<ChuongTrinhKhungNienChe>) => {
    formMethods.reset(params.row);
    setSelectedData(params.row);

    const payload = {
      idCoSoDaoTao: params.row.idCoSoDaoTao,
      idKhoaHoc: params.row.idKhoaHoc,
      idLoaiDaoTao: params.row.idLoaiDaoTao,
      idNganhHoc: params.row.idNganhHoc,
      idBacDaoTao: params.row.idBacDaoTao,
      idChuyenNganh: params.row.idChuyenNganh,
    };
    mergeParamsLopHocCTK(payload);
    setEnabled(true);
  };
  const onAddCTKTinChi = () => {
    handleOpenModal();
    SetIsAddMode(true);
  };
  const onEditCTKTinChi = () => {
    handleOpenModal();
    SetIsAddMode(false);
  };
  const onCloseModal = () => {
    formMethods.reset();
    handleCloseModal();
    refetch();
  };
  const {
    data: lopHocCTKData,
    isRefetching: isLopHocCTKRefetching,
    tableConfig: lopHocCTKTableConfig,
    mergeParams: mergeParamsLopHocCTK,
  } = useCrudPaginationModal<LopHocCTKNienCheType, LopHocCTKNienCheType>({
    defaultValues: {},
    schema: LopHocCTKNienCheSchema,
    entity: 'LopHoc',
    enabled: !!enabled,
    endpoint: 'lop-hoc-chuong-trinh-khung',
  });
  const onApplyCTKFilter = (value: any) => {
    mergeParams(value);
    mergeParamsLopHocCTK(defaultChuongTrinhKhungTinChiFilters);
    setEnabled(true);
  };
  const onClearCTKFilter = () => {
    onApplyCTKFilter(defaultChuongTrinhKhungNienCheFilters);
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
            title={
              isAddMode
                ? 'Lập chương trình khung - niên chế'
                : 'Cập nhật chương trình khung - niên chế'
            }
            onClose={onCloseModal}
            fullScreenMode
          >
            <LapChuongTrinhKhungNienCheModal
              onClose={onCloseModal}
              selectedData={isAddMode ? null : selectedData}
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
          onAdd={onAddCTKTinChi}
          onEdit={onEditCTKTinChi}
          onExport={(dataOption, columnOption) => {
            exportPaginationToExcel<ChuongTrinhKhungNienChe>({
              entity: 'ChuongTrinhKhungNienChe',
              filteredData: data?.result ?? [],
              columns: quanLyChuongTrinhKhungNienCheColumns,
              options: { dataOption, columnOption },
              columnVisibilityModel,
              fileName: 'Danh_sach_chuong_trinh_khung_nien_che',
            });
          }}
        />
        <DiemAlert sx={{ my: 1, pl: 1, py: 0 }} />
        <QuanLyChuongTrinhKhungNienCheFilter
          onApply={onApplyCTKFilter}
          onClear={onClearCTKFilter}
        />
        <Stack direction="row" spacing={0.5} sx={{ flex: 1, overflow: 'hidden' }}>
          <Stack sx={{ width: '70%', overflow: 'hidden' }}>
            <DataGridTable
              columns={quanLyChuongTrinhKhungNienCheColumns}
              rows={data?.result}
              getRowId={(row) => row.id}
              loading={isRefetching}
              onRowClick={handleClickRow}
              onRowSelectionModelChange={handleRowSelectionModelChange}
              rowSelectionModel={selectedRows}
              {...tableConfig}
            />
          </Stack>
          <Stack sx={{ width: '30%', overflow: 'hidden' }}>
            <DataGridTable
              columns={lopHocColumns}
              rows={lopHocCTKData?.result}
              getRowId={(row) => row.id}
              loading={isLopHocCTKRefetching}
              {...lopHocCTKTableConfig}
              checkboxSelection={false}
              hideFooterSelectedRowCount={true}
            />
          </Stack>
        </Stack>
      </Stack>
    </FormProvider>
  );
};

export default QuanLyChuongTrinhKhungNienChe;
