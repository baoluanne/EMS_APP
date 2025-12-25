import { Stack } from '@mui/material';
import { DiemAlert } from '@renderer/components/alerts';
import { DeleteConfirmationModal, FormDetailsModal } from '@renderer/components/modals';
import { DataGridTable } from '@renderer/components/Table';
import { ActionsToolbar } from '@renderer/components/toolbars';
import {
  quyUocCotDiemColumnGroupingModel,
  quyUocCotDiemColumns,
  quyUocCotDiemTienChiDefaultFilters,
  QuyUocCotDiemTinChiForm,
} from '@renderer/features/quy-uoc-cot-diem-tin-chi';
import { QuyUocCotDiemFilters } from '@renderer/features/quy-uoc-cot-diem-tin-chi/components/QuyUocCotDiemFilter';
import {
  QuyUocCotDiemTinChi,
  QuyUocCotDiemTinChiSchema,
} from '@renderer/features/quy-uoc-cot-diem-tin-chi/validations';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';
import { FormProvider } from 'react-hook-form';

const defaultQuyUocCotDiemTinChiValues = {
  id: undefined,
  tenQuyUoc: undefined,
  idQuyChe_TinChi: undefined,
  idKieuMon: undefined,
  tenKieuMonHoc: undefined,
  idKieuLamTron: undefined,
  tenKieuLamTron: undefined,
  isKhongTinhTBC: false,
  diemTBC: undefined,
  isChiDiemCuoiKy: false,
  isChiDanhGia: false,
  isXetDuThiGiuaKy: false,
  isSuDung: false,
  chuyenCan: undefined,
  thuongXuyen1: undefined,
  thuongXuyen2: undefined,
  thuongXuyen3: undefined,
  thuongXuyen4: undefined,
  thuongXuyen5: undefined,
  tieuLuan_BTL: undefined,
  cuoiKy: undefined,
  soCotDiemTH: undefined,
  isHSLTTH_TC: false,
  heSoTH: undefined,
  heSoLT: undefined,
  isDiemRangBuocCK: false,
  diemRangBuocCK: undefined,
  drb_CotDiemGK: undefined,
  drb_CotDiemCC: undefined,
  drb_DiemThuongKy: undefined,
  drb_DiemGiuaKy: undefined,
  drb_CongThucTinhDTB_TK: undefined,
  drb_GhiChu: undefined,
  drb_DiemChuyenCan: undefined,
  drb_DiemTieuLuan: undefined,
  drb_ThangDiemMax: undefined,
};
const QuyUocCotDiemTinChiPage = () => {
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
  } = useCrudPaginationModal<QuyUocCotDiemTinChi, QuyUocCotDiemTinChi>({
    defaultValues: defaultQuyUocCotDiemTinChiValues,
    schema: QuyUocCotDiemTinChiSchema,
    entity: 'QuyUocCotDiem_TC_',
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
            exportPaginationToExcel<QuyUocCotDiemTinChi>({
              entity: 'QuyUocCotDiem_TC_',
              filteredData: data?.result ?? [],
              columns: quyUocCotDiemColumns,
              options: { dataOption, columnOption },
              columnVisibilityModel,
              fileName: 'Danh_sach_quy_uoc_cot_diem_tin_chi',
            });
          }}
        />

        {isModalOpen && (
          <FormDetailsModal
            title={
              isAddMode
                ? 'Thêm mới quy ước cột điểm - tín chỉ'
                : 'Cập nhật quy ước cột điểm - tín chỉ'
            }
            onClose={handleCloseModal}
            onSave={onSave}
          >
            <QuyUocCotDiemTinChiForm />
          </FormDetailsModal>
        )}
        {isDeleteOpenModal && (
          <DeleteConfirmationModal
            onClose={() => setIsDeleteOpenModal(false)}
            onDelete={handleDeleteRecord}
          />
        )}

        <DiemAlert sx={{ my: 1, pl: 1, py: 0 }} />

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

export default QuyUocCotDiemTinChiPage;
