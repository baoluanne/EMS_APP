import { Stack } from '@mui/material';
import { DeleteConfirmationModal, FormDetailsModal } from '@renderer/components/modals';
import { DataGridTable } from '@renderer/components/Table';
import { ActionsToolbar } from '@renderer/components/toolbars';
import {
  QuyUocCotDiem_NC,
  QuyUocCotDiem_NCSchema,
  quyUocCotDiemColumnGroupingModel,
  quyUocCotDiemColumns,
  QuyUocCotDiemNienCheForm,
} from '@renderer/features/quy-uoc-cot-diem-nien-che';
import { quyUocCotDiemTienChiDefaultFilters } from '@renderer/features/quy-uoc-cot-diem-tin-chi';
import { QuyUocCotDiemFilters } from '@renderer/features/quy-uoc-cot-diem-tin-chi/components/QuyUocCotDiemFilter';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';
import { FormProvider } from 'react-hook-form';

const defaultValues = {
  id: undefined,

  tenQuyUoc: undefined,
  idQuyChe_NienChe: undefined,
  idKieuMon: undefined,
  idKieuLamTron: undefined,

  isKhongTinhTBC: undefined,
  diemTBC: undefined,
  isChiDiemCuoiKy: undefined,
  isChiDanhGia: undefined,
  isSuDung: undefined,
  chuyenCan: undefined,
  thuongXuyen1: undefined,
  thuongXuyen2: undefined,
  thuongXuyen3: undefined,
  thuongXuyen4: undefined,
  thuongXuyen5: undefined,
  soCotChuyenCan: undefined,
  soCotThucHanh: undefined,
  heSoTheoDVHT: undefined,
  soCotLTHS1: undefined,
  soCotLTHS2: undefined,
  soCotLTHS3: undefined,
  soCotTHHS1: undefined,
  soCotTHHS2: undefined,
  soCotTHHS3: undefined,
  heSoTBTK: undefined,
  heSoCK: undefined,
  heSoTheoLTTH_TC: undefined,
  heSoLT: undefined,
  heSoTH: undefined,
  isApDungQuyCheNghe: undefined,
  isApDungQuyCheMonVH: undefined,
  isRangBuocDCK: undefined,
  diemRangBuocCK: undefined,
  isXetDuThiGK: undefined,
  isKhongApDungHSCD: undefined,
  drB_CotDiemGK: undefined,
  drB_CotDiemCC: undefined,
  drB_DiemThuongKy: undefined,
  drB_DiemGiuaKy: undefined,
  drB_DiemChuyenCan: undefined,
  drB_DiemTieuLuan: undefined,
  soCotDiemGK: undefined,
  soCotDiemCC: undefined,
  drB_CongThucTinhDTB_TK: undefined,
  drB_GhiChu: undefined,
  drB_ThangDiemMax: undefined,
};

const QuyUocCotDiemNienChe = () => {
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
  } = useCrudPaginationModal<QuyUocCotDiem_NC, QuyUocCotDiem_NC>({
    defaultValues,
    schema: QuyUocCotDiem_NCSchema,
    entity: 'QuyUocCotDiem_NC_',
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
        <ActionsToolbar
          selectedRowIds={selectedRows}
          onDelete={() => setIsDeleteOpenModal(true)}
          onAdd={onAdd}
          onEdit={onEdit}
          onExport={(dataOption, columnOption) => {
            exportPaginationToExcel<QuyUocCotDiem_NC>({
              entity: 'QuyUocCotDiem_NC_',
              filteredData: data?.result ?? [],
              columns: quyUocCotDiemColumns,
              options: { dataOption, columnOption },
              columnVisibilityModel,
              fileName: 'Danh_sach_quy_uoc_cot_diem_nien_che',
            });
          }}
        />

        {isModalOpen && (
          <FormDetailsModal
            title={
              isAddMode
                ? 'Thêm mới quy ước cột điểm - niên chế'
                : 'Cập nhật quy ước cột điểm - niên chế'
            }
            onClose={handleCloseModal}
            onSave={onSave}
          >
            <QuyUocCotDiemNienCheForm />
          </FormDetailsModal>
        )}
        {isDeleteOpenModal && (
          <DeleteConfirmationModal
            onClose={() => setIsDeleteOpenModal(false)}
            onDelete={handleDeleteRecord}
          />
        )}

        <QuyUocCotDiemFilters
          onApply={mergeParams}
          onClear={() => {
            mergeParams(quyUocCotDiemTienChiDefaultFilters);
          }}
        />
        <DataGridTable
          columns={quyUocCotDiemColumns}
          rows={data?.result}
          getRowId={(row) => row.id}
          columnGroupingModel={quyUocCotDiemColumnGroupingModel}
          columnGroupHeaderHeight={28}
          columnHeaderHeight={40}
          loading={isRefetching}
          onRowClick={(params) => formMethods.reset(params.row)}
          onRowSelectionModelChange={handleRowSelectionModelChange}
          rowSelectionModel={selectedRows}
          height={'calc(100% - 85px)'}
          {...tableConfig}
        />
      </Stack>
    </FormProvider>
  );
};

export default QuyUocCotDiemNienChe;
