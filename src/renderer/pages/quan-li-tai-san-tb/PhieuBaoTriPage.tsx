import { useMemo, useState } from 'react';
import { Stack } from '@mui/material';
import { FormProvider } from 'react-hook-form';
import { DataGridTable } from '@renderer/components/Table';
import { DeleteConfirmationModal, FormDetailsModal } from '@renderer/components/modals';
import { ActionsToolbar } from '@renderer/components/toolbars';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { TITLE_MODE } from '@renderer/shared/enums';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';
import { matchesSearch } from '@renderer/shared/utils/string';

import { PhieuBaoTriForm } from '@renderer/features/equip-management/bao-tri-thiet-bi/PhieuBaoTriForm';
import { PhieuBaoTriFilter } from '@renderer/features/equip-management/bao-tri-thiet-bi/PhieuBaoTriFilter';
import { PhieuBaoTriDetailsDrawer } from '@renderer/features/equip-management/bao-tri-thiet-bi/PhieuBaoTriDetailsDrawer';
import { phieuBaoTriColumns } from '@renderer/features/equip-management/bao-tri-thiet-bi/table.configs';
import {
  phieuBaoTriSchema,
  PhieuBaoTriFilterState,
  PhieuBaoTri,
} from '@renderer/features/equip-management/bao-tri-thiet-bi/validation';

const defaultValues = {
  maPhieu: '',
  chiTietThietBis: [],
  nguoiLapPhieuId: '',
  nguoiXuLyId: null,
  loaiBaoTri: 0,
  ngayBatDau: new Date(),
  ngayKetThuc: null,
  noiDungBaoTri: '',
  ketQuaXuLy: '',
  chiPhi: 0,
  ghiChu: '',
  trangThai: 0,
  hinhAnhUrl: '',
};

const PhieuBaoTriPage = () => {
  const [filters, setFilters] = useState<PhieuBaoTriFilterState>({});
  const [viewModal, setViewModal] = useState<{ open: boolean; data: any }>({
    open: false,
    data: null,
  });

  const {
    formMethods,
    data,
    isModalOpen,
    isRefetching,
    handleRowSelectionModelChange,
    isDeleteOpenModal,
    onAdd,
    onEdit,
    openEditModal,
    onSave,
    handleDeleteRecord,
    selectedRows,
    setIsDeleteOpenModal,
    handleCloseModal,
    isAddMode,
    tableConfig,
  } = useCrudPaginationModal<PhieuBaoTri, any>({
    defaultValues,
    schema: phieuBaoTriSchema as any,
    entity: 'PhieuBaoTri',
  });

  const columns = useMemo(() => phieuBaoTriColumns(), []);

  const rowsData = useMemo(() => {
    if (!data) return [];

    let rows: any[] = [];
    if ('data' in data && Array.isArray(data.data)) rows = data.data;
    else if ('result' in data && Array.isArray(data.result)) rows = data.result;
    else if (Array.isArray(data)) rows = data;

    if (Object.keys(filters).length === 0) return rows;

    return rows.filter((row) => {
      if (filters.maPhieu && !matchesSearch(row.maPhieu, filters.maPhieu)) return false;

      if (filters.tuNgay || filters.denNgay) {
        const rowDate = format(new Date(row.ngayBatDau), 'dd/MM/yyyy');
        if (filters.tuNgay && !rowDate.includes(filters.tuNgay)) return false;
        if (filters.denNgay && !rowDate.includes(filters.denNgay)) return false;
      }

      if (filters.trangThaiText) {
        const statusMap = { 0: 'Chờ xử lý', 1: 'Đang bảo trì', 2: 'Hoàn thành', 3: 'Đã hủy' };
        const currentStatus = statusMap[row.trangThai as keyof typeof statusMap] || '';
        if (!matchesSearch(currentStatus, filters.trangThaiText)) return false;
      }

      return true;
    });
  }, [data, filters]);

  // ✅ Đã fix lỗi crash bằng cách bỏ ép kiểu và truyền thẳng params cho onEdit
  const handleEditFromDrawer = (rowData: any) => {
    setViewModal({ open: false, data: null });

    // Đa số hook useCrudPaginationModal hỗ trợ truyền thẳng id hoặc object vào onEdit
    openEditModal(rowData);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <FormProvider {...formMethods}>
        <Stack height="100%" width="100%" p={2}>
          <ActionsToolbar
            selectedRowIds={selectedRows}
            onDelete={() => setIsDeleteOpenModal(true)}
            onAdd={onAdd}
            onEdit={onEdit}
          />

          <PhieuBaoTriFilter onApply={setFilters} onReset={() => setFilters({})} />

          {isModalOpen && (
            <FormDetailsModal
              title={isAddMode ? 'Lập phiếu bảo trì' : 'Cập nhật phiếu bảo trì'}
              onClose={handleCloseModal}
              onSave={onSave}
              maxWidth="sm"
              titleMode={TITLE_MODE.COLORED}
            >
              <PhieuBaoTriForm isAddMode={isAddMode} />
            </FormDetailsModal>
          )}

          {isDeleteOpenModal && (
            <DeleteConfirmationModal
              onClose={() => setIsDeleteOpenModal(false)}
              onDelete={handleDeleteRecord}
            />
          )}

          <PhieuBaoTriDetailsDrawer
            open={viewModal.open}
            data={viewModal.data}
            onClose={() => setViewModal({ open: false, data: null })}
            onEdit={handleEditFromDrawer}
          />

          <DataGridTable
            columns={columns}
            rows={rowsData}
            loading={isRefetching}
            checkboxSelection
            onRowClick={(params) => setViewModal({ open: true, data: params.row })}
            onRowSelectionModelChange={handleRowSelectionModelChange}
            rowSelectionModel={selectedRows}
            getRowId={(row) => row.id!}
            height="calc(100% - 120px)"
            disableRowSelectionOnClick={false}
            {...tableConfig}
          />
        </Stack>
      </FormProvider>
    </LocalizationProvider>
  );
};

export default PhieuBaoTriPage;