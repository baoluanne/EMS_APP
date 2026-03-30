import { useCallback, useMemo, useState } from 'react';
import { Stack, Button } from '@mui/material';
import { FormProvider } from 'react-hook-form';
import { DataGridTable } from '@renderer/components/Table';
import { DeleteConfirmationModal, FormDetailsModal } from '@renderer/components/modals';
import { ActionsToolbar } from '@renderer/components/toolbars';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { TITLE_MODE } from '@renderer/shared/enums';
import { axios } from '@renderer/shared/lib';
import { toast } from 'react-toastify';
import { PhieuMuonTraForm } from '../../features/equip-management/muon-tra-thiet-bi/PhieuMuonTraForm';
import { PhieuMuonTraFilter } from '../../features/equip-management/muon-tra-thiet-bi/PhieuMuonTraFilter ';
import {
  phieuMuonTraColumns as columns,
  PhieuMuonTraRow,
} from '../../features/equip-management/muon-tra-thiet-bi/table.configs';
import {
  phieuMuonTraSchema,
  PhieuMuonTraFilterState,
} from '../../features/equip-management/muon-tra-thiet-bi/validation';
import { ReturnEquipmentModal } from '../../features/equip-management/muon-tra-thiet-bi/ReturnEquipmentModal';
import { PhieuMuonTraDetailsDrawer } from '@renderer/features/equip-management/muon-tra-thiet-bi/PhieuMuonTraDetailsDrawer';
import { matchesSearch } from '@renderer/shared/utils/string';

const defaultValues = {
  id: undefined,
  loaiDoiTuong: 1,
  sinhVienId: '',
  giangVienId: '',
  ngayMuon: new Date(),
  ngayTraDuKien: new Date(),
  ghiChu: '',
  chiTietPhieuMuons: [],
};

const PhieuMuonTraPage = () => {
  const [filters, setFilters] = useState<PhieuMuonTraFilterState>({});
  const [returnModal, setReturnModal] = useState<{ open: boolean; data: any }>({
    open: false,
    data: null,
  });
  const [viewModal, setViewModal] = useState<{ open: boolean; data: any }>({
    open: false,
    data: null,
  });
  const [isUpdating, setIsUpdating] = useState(false);

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
    tableConfig,
    refetch,
  } = useCrudPaginationModal<any, any>({
    defaultValues,
    schema: phieuMuonTraSchema,
    entity: 'PhieuMuonTra',
  });

  const handleOpenReturnModal = useCallback((row: PhieuMuonTraRow) => {
    setReturnModal({ open: true, data: row });
  }, []);

  const handleSaveReturn = async (formData: any) => {
    setIsUpdating(true);
    try {
      const payload = {
        loaiDoiTuong: returnModal.data.loaiDoiTuong,
        sinhVienId: returnModal.data.sinhVienId,
        giangVienId: returnModal.data.giangVienId,
        ngayMuon: returnModal.data.ngayMuon,
        ngayTraDuKien: returnModal.data.ngayTraDuKien,
        lyDoMuon: returnModal.data.lyDoMuon,
        ghiChu: returnModal.data.ghiChu,
        chiTietPhieuMuons: formData.chiTietPhieuMuons.map((ct: any) => ({
          thietBiId: ct.thietBiId,
          isDaTra: true,
          tinhTrangKhiTra: ct.tinhTrangKhiTra || 'Bình thường',
        })),
      };

      await axios.put(`/PhieuMuonTra/${formData.id}`, payload);
      toast.success('Cập nhật phiếu trả thành công');
      setReturnModal({ open: false, data: null });
      await refetch();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error?.message || 'Lỗi khi cập nhật phiếu trả');
    } finally {
      setIsUpdating(false);
    }
  };

  const actionColumns = useMemo(() => {
    return columns.map((col) => {
      if (col.field === 'actions') {
        return {
          ...col,
          width: 140,
          renderCell: (params: any) => (
            <Stack direction="row" spacing={1} alignItems="center">

              <Button
                variant="contained"
                size="small"
                color="success"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenReturnModal(params.row);
                }}
                disabled={params.row.trangThai === 1}
              >
                Trả máy
              </Button>
            </Stack>
          ),
        };
      }
      return col;
    });
  }, [handleOpenReturnModal]);

  const rowsData = useMemo<PhieuMuonTraRow[]>(() => {
    if (!data) return [];
    let rows: PhieuMuonTraRow[] = [];
    if ('data' in data && Array.isArray(data.data)) {
      rows = data.data as PhieuMuonTraRow[];
    } else if ('result' in data && Array.isArray(data.result)) {
      rows = data.result as PhieuMuonTraRow[];
    }

    if (Object.keys(filters).length === 0) return rows;

    return rows.filter((row) => {
      if (filters.maPhieu && !matchesSearch(row.maPhieu, filters.maPhieu)) {
        return false;
      }

      if (filters.tenNguoiMuon) {
        const tenNguoiMuon =
          row.loaiDoiTuong === 1
            ? `${row.sinhVien?.hoDem || ''} ${row.sinhVien?.ten || ''}`.trim()
            : `${row.giangVien?.hoDem || ''} ${row.giangVien?.ten || ''}`.trim();

        if (!matchesSearch(tenNguoiMuon, filters.tenNguoiMuon)) {
          return false;
        }
      }

      if (filters.maThietBi || filters.tenThietBi) {
        const hasMatchingThietBi = row.chiTietPhieuMuons?.some((ct) => {
          const matchMa = matchesSearch(ct.thietBi?.maThietBi, filters.maThietBi || '');
          const matchTen = matchesSearch(ct.thietBi?.tenThietBi, filters.tenThietBi || '');
          return matchMa && matchTen;
        });
        if (!hasMatchingThietBi) return false;
      }

      if (filters.trangThaiText) {
        const statusMap = { 0: 'Đang mượn', 1: 'Đã trả', 2: 'Quá hạn' };
        const currentStatus = statusMap[row.trangThai as keyof typeof statusMap] || '';
        if (!matchesSearch(currentStatus, filters.trangThaiText)) {
          return false;
        }
      }

      if (filters.loaiDoiTuongText) {
        const loaiMap = { 1: 'Sinh viên', 2: 'Giảng viên' };
        const currentLoai = loaiMap[row.loaiDoiTuong as keyof typeof loaiMap] || '';
        if (!matchesSearch(currentLoai, filters.loaiDoiTuongText)) {
          return false;
        }
      }

      return true;
    });
  }, [data, filters]);

  const handleApplyFilter = (newFilters: PhieuMuonTraFilterState) => setFilters(newFilters);
  const handleResetFilter = () => setFilters({});

  return (
    <FormProvider {...formMethods}>
      <Stack height="100%" width="100%" p={2}>
        <ActionsToolbar
          selectedRowIds={selectedRows}
          onDelete={() => setIsDeleteOpenModal(true)}
          onAdd={onAdd}
        />

        <PhieuMuonTraFilter onApply={handleApplyFilter} onReset={handleResetFilter} />

        {isModalOpen && (
          <FormDetailsModal
            title="Lập phiếu mượn"
            onClose={handleCloseModal}
            onSave={onSave}
            maxWidth="sm"
            titleMode={TITLE_MODE.COLORED}
          >
            <PhieuMuonTraForm />
          </FormDetailsModal>
        )}

        {isDeleteOpenModal && (
          <DeleteConfirmationModal
            onClose={() => setIsDeleteOpenModal(false)}
            onDelete={handleDeleteRecord}
          />
        )}

        <ReturnEquipmentModal
          open={returnModal.open}
          data={returnModal.data}
          onClose={() => setReturnModal({ open: false, data: null })}
          onSave={handleSaveReturn}
        />

        <PhieuMuonTraDetailsDrawer
          open={viewModal.open}
          data={viewModal.data}
          onClose={() => setViewModal({ open: false, data: null })}
        />

        <DataGridTable
          columns={actionColumns}
          rows={rowsData}
          loading={isRefetching || isUpdating}
          checkboxSelection
          onRowClick={(params) => setViewModal({ open: true, data: params.row })}
          onRowSelectionModelChange={handleRowSelectionModelChange}
          rowSelectionModel={selectedRows}
          getRowId={(row) => row.id}
          height="calc(100% - 120px)"
          {...tableConfig}
        />
      </Stack>
    </FormProvider>
  );
};

export default PhieuMuonTraPage;
