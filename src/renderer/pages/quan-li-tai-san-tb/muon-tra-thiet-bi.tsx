// muon-tra-thiet-bi.tsx
import { useMemo, useState } from 'react';
import { Stack } from '@mui/material';
import { FormProvider } from 'react-hook-form';
import { DataGridTable } from '@renderer/components/Table';
import { DeleteConfirmationModal, FormDetailsModal } from '@renderer/components/modals';
import { ActionsToolbar } from '@renderer/components/toolbars';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { TITLE_MODE } from '@renderer/shared/enums';

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

const defaultValues = {
  maPhieu: '',
  loaiDoiTuong: 0,
  ngayMuon: new Date(),
  ngayTraDuKien: new Date(),
  chiTietPhieuMuons: [],
};

const PhieuMuonTraPage = () => {
  const [filters, setFilters] = useState<PhieuMuonTraFilterState>({});

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
  } = useCrudPaginationModal<any, any>({
    defaultValues,
    schema: phieuMuonTraSchema,
    entity: 'PhieuMuonTra',
  });

  const rowsData = useMemo<PhieuMuonTraRow[]>(() => {
    if (!data) return [];

    let rows: PhieuMuonTraRow[] = [];

    if ('data' in data && Array.isArray(data.data)) {
      rows = data.data as PhieuMuonTraRow[];
    } else if ('result' in data && Array.isArray(data.result)) {
      rows = data.result as PhieuMuonTraRow[];
    }

    // Áp dụng filter client-side
    if (Object.keys(filters).length === 0) return rows;

    return rows.filter((row) => {
      if (filters.maPhieu && !row.maPhieu?.toLowerCase().includes(filters.maPhieu.toLowerCase())) {
        return false;
      }

      if (filters.tenNguoiMuon) {
        const tenNguoiMuon =
          row.loaiDoiTuong === 0
            ? `${row.sinhVien?.hoDem || ''} ${row.sinhVien?.ten || ''}`.trim()
            : `${row.giangVien?.hoDem || ''} ${row.giangVien?.ten || ''}`.trim();

        if (!tenNguoiMuon.toLowerCase().includes(filters.tenNguoiMuon.toLowerCase())) {
          return false;
        }
      }

      if (filters.maThietBi || filters.tenThietBi) {
        const hasMatchingThietBi = row.chiTietPhieuMuons?.some((ct) => {
          const matchMa =
            !filters.maThietBi ||
            ct.thietBi?.maThietBi?.toLowerCase().includes(filters.maThietBi.toLowerCase());
          const matchTen =
            !filters.tenThietBi ||
            ct.thietBi?.tenThietBi?.toLowerCase().includes(filters.tenThietBi.toLowerCase());
          return matchMa && matchTen;
        });
        if (!hasMatchingThietBi) return false;
      }

      if (filters.trangThaiText) {
        const statusMap = ['Đang mượn', 'Đã trả', 'Quá hạn'];
        const currentStatus = statusMap[row.trangThai] || '';
        if (!currentStatus.toLowerCase().includes(filters.trangThaiText.toLowerCase())) {
          return false;
        }
      }

      if (filters.loaiDoiTuongText) {
        const loaiMap = ['Sinh viên', 'Giảng viên'];
        const currentLoai = loaiMap[row.loaiDoiTuong] || '';
        if (!currentLoai.toLowerCase().includes(filters.loaiDoiTuongText.toLowerCase())) {
          return false;
        }
      }

      return true;
    });
  }, [data, filters]);

  const handleApplyFilter = (newFilters: PhieuMuonTraFilterState) => {
    setFilters(newFilters);
  };

  const handleResetFilter = () => {
    setFilters({});
  };

  return (
    <FormProvider {...formMethods}>
      <Stack height="100%" width="100%" p={2}>
        <ActionsToolbar
          selectedRowIds={selectedRows}
          onDelete={() => setIsDeleteOpenModal(true)}
          onAdd={onAdd}
          onEdit={onEdit}
        />

        {/* Filter Component */}
        <PhieuMuonTraFilter onApply={handleApplyFilter} onReset={handleResetFilter} />

        {isModalOpen && (
          <FormDetailsModal
            title={isAddMode ? 'Lập phiếu mượn' : 'Cập nhật phiếu mượn'}
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

        <DataGridTable
          columns={columns}
          rows={rowsData}
          loading={isRefetching}
          checkboxSelection
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
