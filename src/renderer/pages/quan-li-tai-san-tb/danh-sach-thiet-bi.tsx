import { useCallback, useMemo, useState } from 'react';
import { Button, Stack } from '@mui/material';
import { FormProvider } from 'react-hook-form';
import { DataGridTable } from '@renderer/components/Table';
import { DeleteConfirmationModal, FormDetailsModal } from '@renderer/components/modals';
import { ActionsToolbar } from '@renderer/components/toolbars';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';
import { DanhSachThietBiForm } from '../../features/equip-management/danh-sach-thiet-bi/components/danh-sach-thiet-bi-form';
import { DanhSachThietBiFilter } from '../../features/equip-management/danh-sach-thiet-bi/components/danh-sach-thiet-bi-filter';
import { NhapHangLoatModal } from '../../features/equip-management/danh-sach-thiet-bi/NhapHangLoatModal';
import { AssignRoomModal } from '../../features/equip-management/danh-sach-thiet-bi/components/AssignRoomModal';
import { danhSachThietBiColumns as columns } from '../../features/equip-management/danh-sach-thiet-bi/configs/table.configs';
import { DanhSachThietBiFilterState } from '../../features/equip-management/danh-sach-thiet-bi/type';
import {
  DanhSachThietBi,
  danhSachThietBiSchema,
} from '../../features/equip-management/danh-sach-thiet-bi/validation';
import { TITLE_MODE } from '@renderer/shared/enums';
import { TrangThaiThietBiEnum } from '@renderer/features/equip-management/danh-sach-thiet-bi/TrangThaiThietBiEnum';
import { Add, Business } from '@mui/icons-material';

const defaultValues = {
  id: undefined,
  loaiThietBiId: '',
  nhaCungCapId: '',
  maThietBi: '',
  tenThietBi: '',
  model: undefined,
  serialNumber: undefined,
  thongSoKyThuat: undefined,
  namSanXuat: undefined,
  ngayMua: undefined,
  ngayHetHanBaoHanh: undefined,
  nguyenGia: undefined,
  giaTriKhauHao: undefined,
  ghiChu: undefined,
  hinhAnh: undefined,
  phongHocId: undefined,
  trangThai: TrangThaiThietBiEnum.MoiNhap,
};

const formatDateForInput = (dateString: string | null | undefined): string => {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  } catch {
    return '';
  }
};

const formatDateForSave = (dateString: string | null | undefined): string | null => {
  if (!dateString) return null;
  return dateString.includes('T') ? dateString : `${dateString}T00:00:00Z`;
};

const DanhSachThietBiPage = () => {
  const [filters, setFilters] = useState<DanhSachThietBiFilterState>({});
  const [nhapHangLoatOpen, setNhapHangLoatOpen] = useState(false);
  const [assignRoomOpen, setAssignRoomOpen] = useState(false);

  const {
    formMethods,
    data,
    isModalOpen,
    isRefetching,
    handleRowSelectionModelChange,
    isDeleteOpenModal,
    onAdd,
    onEdit,
    onSave: originalOnSave,
    handleDeleteRecord,
    selectedRows,
    setIsDeleteOpenModal,
    handleCloseModal,
    isAddMode,
    tableConfig,
    columnVisibilityModel,
    refetch,
  } = useCrudPaginationModal<DanhSachThietBi, DanhSachThietBi>({
    defaultValues,
    schema: danhSachThietBiSchema,
    entity: 'ThietBi',
  });

  const selectedCount = useMemo(() => {
    return (selectedRows as any)?.ids?.size || 0;
  }, [selectedRows]);

  const selectedIdsArray = useMemo(() => {
    const idsSet = (selectedRows as any)?.ids;
    return idsSet ? Array.from(idsSet).map((id) => String(id)) : [];
  }, [selectedRows]);

  const onSave = useCallback(async () => {
    const formData = formMethods.getValues();
    const transformedData = {
      ...formData,
      loaiThietBi:
        formData.loaiThietBiId !== null && formData.loaiThietBiId !== undefined
          ? formData.loaiThietBiId
          : null,
      nhaCungCap:
        formData.nhaCungCapId !== null && formData.nhaCungCapId !== undefined
          ? formData.nhaCungCapId
          : null,
      namSanXuat: formData.namSanXuat ? Number(formData.namSanXuat) : null,
      nguyenGia: formData.nguyenGia ? Number(formData.nguyenGia) : null,
      giaTriKhauHao: formData.giaTriKhauHao ? Number(formData.giaTriKhauHao) : null,
      ngayMua: formatDateForSave(formData.ngayMua),
      ngayHetHanBaoHanh: formatDateForSave(formData.ngayHetHanBaoHanh),
      trangThai:
        formData.trangThai !== null && formData.trangThai !== undefined
          ? Number(formData.trangThai)
          : null,
    };
    Object.keys(transformedData).forEach((key) => {
      formMethods.setValue(key as any, transformedData[key as keyof typeof transformedData]);
    });
    await originalOnSave();
  }, [formMethods, originalOnSave]);

  const rowsData: DanhSachThietBi[] = useMemo(() => {
    const rawData = (data as any)?.data || (data as any)?.result || [];
    const isFilterActive =
      !!filters.thongSoKyThuat ||
      !!filters.model ||
      !!filters.loaiThietBiId ||
      !!filters.nhaCungCapId ||
      !!filters.maThietBi ||
      !!filters.tenThietBi ||
      (filters.trangThai !== undefined && filters.trangThai !== null);

    if (!isFilterActive) return rawData as DanhSachThietBi[];

    return (rawData as DanhSachThietBi[]).filter((row) => {
      const matchthongSoKyThuat =
        !filters.thongSoKyThuat || row.thongSoKyThuat?.includes(filters.thongSoKyThuat);
      const matchModel = !filters.model || row.model?.includes(filters.model);
      const matchLoai =
        !filters.loaiThietBiId || row.loaiThietBiId?.includes(filters.loaiThietBiId);
      const matchNhaCungCap =
        !filters.nhaCungCapId || row.nhaCungCapId?.includes(filters.nhaCungCapId);
      const matchMa =
        !filters.maThietBi ||
        row.maThietBi?.toLowerCase().includes(filters.maThietBi.toLowerCase());
      const matchTen =
        !filters.tenThietBi ||
        row.tenThietBi?.toLowerCase().includes(filters.tenThietBi.toLowerCase());
      const matchTrangThai =
        filters.trangThai === undefined ||
        filters.trangThai === null ||
        Number(row.trangThai) === Number(filters.trangThai);
      return (
        matchMa &&
        matchTen &&
        matchTrangThai &&
        matchLoai &&
        matchNhaCungCap &&
        matchModel &&
        matchthongSoKyThuat
      );
    });
  }, [data, filters]);

  const handleNhapHangLoatSubmit = useCallback(async (formData: any) => {
    try {
      const response = await fetch('http://localhost:5031/api/ThietBi/nhap-hang-loat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      return result.data || result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }, []);

  const handleRefresh = useCallback(() => {
    if (refetch) setTimeout(() => refetch(), 300);
  }, [refetch]);

  return (
    <FormProvider {...formMethods}>
      <Stack height="100%" width="100%" p={2}>
        <ActionsToolbar
          selectedRowIds={selectedRows}
          onDelete={() => setIsDeleteOpenModal(true)}
          onAdd={onAdd}
          onEdit={onEdit}
          customStartActions={
            <Stack direction="row" spacing={1}>
              <Button
                variant="text"
                size="small"
                startIcon={<Add />}
                onClick={() => setNhapHangLoatOpen(true)}
              >
                Nhập hàng loạt
              </Button>
              <Button
                variant="text"
                size="small"
                color="secondary"
                startIcon={<Business />}
                disabled={selectedCount === 0}
                onClick={() => setAssignRoomOpen(true)}
              >
                Phân vào phòng
              </Button>
            </Stack>
          }
          onExport={(dataOption, columnOption) => {
            exportPaginationToExcel<DanhSachThietBi>({
              entity: 'danh-sach-thiet-bi',
              filteredData: rowsData,
              columns: columns,
              options: { dataOption, columnOption },
              columnVisibilityModel,
              fileName: 'Danh_sach_thiet_bi',
            });
          }}
        />

        {isModalOpen && (
          <FormDetailsModal
            title={isAddMode ? 'Thêm mới thiết bị' : 'Chỉnh sửa thiết bị'}
            onClose={handleCloseModal}
            onSave={onSave}
            maxWidth="sm"
            titleMode={TITLE_MODE.COLORED}
          >
            <DanhSachThietBiForm />
          </FormDetailsModal>
        )}

        {nhapHangLoatOpen && (
          <NhapHangLoatModal
            open={nhapHangLoatOpen}
            onClose={() => setNhapHangLoatOpen(false)}
            onSuccess={handleRefresh}
            onSubmitBulk={handleNhapHangLoatSubmit}
            refetch={refetch}
          />
        )}

        {assignRoomOpen && (
          <AssignRoomModal
            selectedIds={selectedIdsArray}
            onClose={() => setAssignRoomOpen(false)}
            onSuccess={handleRefresh}
          />
        )}

        {isDeleteOpenModal && (
          <DeleteConfirmationModal
            onClose={() => setIsDeleteOpenModal(false)}
            onDelete={async () => {
              await handleDeleteRecord();
              handleRefresh();
            }}
          />
        )}

        <DanhSachThietBiFilter onApply={setFilters} onReset={() => setFilters({})} />

        <DataGridTable
          columns={columns}
          rows={rowsData}
          checkboxSelection
          loading={isRefetching}
          onRowClick={(params) => {
            const rowData = {
              ...params.row,
              ngayMua: formatDateForInput(params.row.ngayMua),
              ngayHetHanBaoHanh: formatDateForInput(params.row.ngayHetHanBaoHanh),
            };
            formMethods.reset(rowData);
          }}
          getRowId={(row) => row.id!}
          onRowSelectionModelChange={handleRowSelectionModelChange}
          rowSelectionModel={selectedRows}
          height="calc(100% - 85px)"
          {...tableConfig}
        />
      </Stack>
    </FormProvider>
  );
};

export default DanhSachThietBiPage;
