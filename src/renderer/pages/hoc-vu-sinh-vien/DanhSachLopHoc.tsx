import { Stack } from '@mui/material';
import { DeleteConfirmationModal, FormDetailsModal } from '@renderer/components/modals';
import { DataGridTable } from '@renderer/components/Table';
import { ActionsToolbar } from '@renderer/components/toolbars';
import {
  columns,
  DanhSachLopHocForm,
  LopHocSchema,
  lopHocSchema,
} from '@renderer/features/hoc-vu-sinh-vien/danh-sach-lop-hoc';
import { DanhSachLopHocFilter } from '@renderer/features/hoc-vu-sinh-vien/danh-sach-lop-hoc/components/DanhSachLopHocFilter';
import {
  DanhSachLopHocFilterState,
  LopHoc,
} from '@renderer/features/hoc-vu-sinh-vien/danh-sach-lop-hoc/types';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';
import { FormProvider } from 'react-hook-form';

const defaultValues: LopHocSchema = {
  idCoSoDaoTao: '',
  idKhoaHoc: '',
  idBacDaoTao: '',
  idLoaiDaoTao: '',
  idNganhHoc: '',
  idChuyenNganh: '',
  idKhoa: '',
  soHopDong: undefined,
  soQuyetDinhThanhLapLop: '',
  ghiChu: undefined,
  maLop: '',
  siSoHienTai: 0,
  tenLop: '',
  tenTiengAnh: undefined,
  idCaHoc: undefined,
  isVisible: true,
  idGiangVienChuNhiem: undefined,
  idCoVanHocTap: undefined,
  ngayHopDong: undefined,
  ngayRaQuyetDinh: undefined,
};

export default function DanhSachLopHoc() {
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
  } = useCrudPaginationModal<LopHoc, LopHocSchema>({
    defaultValues,
    schema: lopHocSchema,
    entity: 'LopHoc',
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
            exportPaginationToExcel<DanhSachLopHocFilterState>({
              entity: 'LopHoc',
              filteredData: data?.result ?? [],
              columns: columns,
              options: { dataOption, columnOption },
              columnVisibilityModel,
              fileName: 'danh_sach_lop_hoc',
            });
          }}
        />
        {isModalOpen && (
          <FormDetailsModal
            title={isAddMode ? 'Thêm mới lớp học' : 'Cập nhật lớp học'}
            onClose={handleCloseModal}
            onSave={onSave}
          >
            <DanhSachLopHocForm />
          </FormDetailsModal>
        )}
        {isDeleteOpenModal && (
          <DeleteConfirmationModal
            onClose={() => setIsDeleteOpenModal(false)}
            onDelete={handleDeleteRecord}
          />
        )}
        <DanhSachLopHocFilter onApply={(value) => mergeParams(value)} />
        <DataGridTable
          columns={columns}
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
    </FormProvider>
  );
}
