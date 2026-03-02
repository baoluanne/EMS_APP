import { useMemo, useState, useCallback, useEffect } from 'react';
import { Stack } from '@mui/material';
import { FormProvider } from 'react-hook-form';
import { DataGridTable } from '@renderer/components/Table';
import { DeleteConfirmationModal, FormDetailsModal } from '@renderer/components/modals';
import { ActionsToolbar } from '@renderer/components/toolbars';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';
import { TITLE_MODE } from '@renderer/shared/enums';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';

import { KiemKeTaiSanForm } from '../../features/equip-management/kiem-ke-tai-san/components/kiem-ke-tai-san-form';
import { KiemKeTaiSanFilter } from '../../features/equip-management/kiem-ke-tai-san/components/kiem-ke-tai-san-filter';
import { kiemKeTaiSanTableColumns } from '../../features/equip-management/kiem-ke-tai-san/configs/table.configs';
import { KiemKeTaiSanFilterState } from '../../features/equip-management/kiem-ke-tai-san/validation';
import {
  KiemKeTaiSan,
  kiemKeTaiSanSchema,
} from '../../features/equip-management/kiem-ke-tai-san/validation';

const defaultValues = {
  id: undefined,
  tenDotKiemKe: '',
  ngayBatDau: new Date(),
  ngayKetThuc: new Date(),
  daHoanThanh: false,
  ghiChu: '',
  chiTietKiemKes: [],
};

// Helper: Convert mảng ID từ DataGrid sang cấu trúc Object cho Hook
const convertToInternalSelection = (ids: any[]) => ({
  type: 'include',
  ids: new Set(ids),
});

const KiemKeTaiSanPage = () => {
  const [filters, setFilters] = useState<KiemKeTaiSanFilterState>({});
  const [backupSelectedRow, setBackupSelectedRow] = useState<any>(null);
  const [pendingActionId, setPendingActionId] = useState<string | null>(null);

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
  } = useCrudPaginationModal<KiemKeTaiSan, KiemKeTaiSan>({
    defaultValues,
    schema: kiemKeTaiSanSchema,
    entity: 'DotKiemKe',
    beforeEdit: (hookRow) => {
      const validRow = hookRow || backupSelectedRow;
      if (!validRow) return undefined;

      return {
        ...validRow,
        ngayBatDau: validRow.ngayBatDau ? new Date(validRow.ngayBatDau) : null,
        ngayKetThuc: validRow.ngayKetThuc ? new Date(validRow.ngayKetThuc) : null,
        // Map chi tiết đầy đủ để hiển thị đúng Ghi chú và Trạng thái
        chiTietKiemKes:
          validRow.chiTietKiemKes?.map((ct: any) => ({
            id: ct.id,
            thietBiId: ct.thietBiId,
            maThietBi: ct.thietBi?.maThietBi,
            tenThietBi: ct.thietBi?.tenThietBi,
            trangThaiSoSach: ct.trangThaiSoSach,
            trangThaiThucTe: ct.trangThaiThucTe,
            khopDot: ct.khopDot,
            ghiChu: ct.ghiChu || '', // Đảm bảo lấy field ghiChu từ DB
          })) || [],
      };
    },
  });

  const rawRowsData = useMemo(() => {
    if (!data) return [];
    const responseData = (data as any).data || (data as any).result;
    return Array.isArray(responseData) ? responseData : [];
  }, [data]);

  const getLocalDateFormat = (dateStr: string) => {
    if (!dateStr) return '';
    return format(new Date(dateStr), 'dd/MM/yyyy');
  };

  const rowsData = useMemo(() => {
    if (Object.keys(filters).length === 0) return rawRowsData;

    return rawRowsData.filter((row: any) => {
      const matchName =
        !filters.tenDotKiemKe ||
        row.tenDotKiemKe?.toLowerCase().includes(filters.tenDotKiemKe.toLowerCase());

      const rowStart = getLocalDateFormat(row.ngayBatDau);
      const matchStart = !filters.ngayBatDau || rowStart.includes(filters.ngayBatDau);

      const rowEnd = getLocalDateFormat(row.ngayKetThuc);
      const matchEnd = !filters.ngayKetThuc || rowEnd.includes(filters.ngayKetThuc);

      const statusText = row.daHoanThanh ? 'đã hoàn thành' : 'chưa hoàn thành';
      const matchStatus =
        !filters.trangThaiText || statusText.includes(filters.trangThaiText!.toLowerCase());

      return matchName && matchStart && matchEnd && matchStatus;
    });
  }, [rawRowsData, filters]);

  const handleFilterApply = (filterValues: KiemKeTaiSanFilterState) => setFilters(filterValues);
  const handleFilterReset = () => setFilters({});

  const handleViewDetail = useCallback(
    (id: string) => {
      const row = rawRowsData.find((r: any) => r.id === id);
      if (row) {
        setBackupSelectedRow(row);
        handleRowSelectionModelChange(convertToInternalSelection([id]) as any);
        setPendingActionId(id);
      }
    },
    [rawRowsData, handleRowSelectionModelChange],
  );

  useEffect(() => {
    if (pendingActionId && selectedRows?.ids?.has(pendingActionId)) {
      onEdit();
      setPendingActionId(null);
    }
  }, [selectedRows, pendingActionId, onEdit]);

  const columns = useMemo(() => kiemKeTaiSanTableColumns(handleViewDetail), [handleViewDetail]);

  // Logic View Only: Nếu không phải thêm mới VÀ bản ghi đã hoàn thành
  const isRecordCompleted = backupSelectedRow?.daHoanThanh === true;
  const isViewOnly = !isAddMode && isRecordCompleted;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <FormProvider {...formMethods}>
        <Stack height="100%" width="100%" p={2}>
          <ActionsToolbar
            selectedRowIds={selectedRows}
            onDelete={() => setIsDeleteOpenModal(true)}
            onAdd={onAdd}
            onEdit={onEdit}
            onExport={(dataOption, columnOption) => {
              exportPaginationToExcel<KiemKeTaiSan>({
                entity: 'kiem-ke-tai-san',
                filteredData: rowsData,
                columns,
                options: { dataOption, columnOption },
                columnVisibilityModel,
                fileName: 'Danh_sach_kiem_ke',
              });
            }}
          />

          <KiemKeTaiSanFilter onApply={handleFilterApply} onReset={handleFilterReset} />

          {isModalOpen && (
            <FormDetailsModal
              title={
                isAddMode
                  ? 'Thêm mới đợt kiểm kê'
                  : isViewOnly
                    ? 'Chi tiết đợt kiểm kê'
                    : 'Cập nhật kiểm kê'
              }
              onClose={handleCloseModal}
              // Nếu ViewOnly -> Ẩn nút Lưu bằng cách không truyền onSave
              onSave={isViewOnly ? undefined : onSave}
              maxWidth="sm"
              titleMode={TITLE_MODE.COLORED}
            >
              {/* Truyền prop readOnly vào Form */}
              <KiemKeTaiSanForm readOnly={isViewOnly} />
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
            checkboxSelection
            loading={isRefetching}
            onRowSelectionModelChange={(newSelection: any) => {
              // Xử lý sự kiện chọn dòng từ DataGrid (Array) -> Hook (Object)
              if (Array.isArray(newSelection)) {
                handleRowSelectionModelChange(convertToInternalSelection(newSelection) as any);
              } else {
                handleRowSelectionModelChange(newSelection);
              }

              // Backup dòng được chọn để dùng cho Logic ViewOnly
              if (Array.isArray(newSelection) && newSelection.length > 0) {
                const currentSelectedId = newSelection[0];
                const rowData = rowsData.find((item: any) => item.id == currentSelectedId);
                setBackupSelectedRow(rowData);
              } else {
                setBackupSelectedRow(null);
              }
            }}
            rowSelectionModel={selectedRows}
            getRowId={(row) => row.id!}
            height="calc(100% - 120px)"
            {...tableConfig}
          />
        </Stack>
      </FormProvider>
    </LocalizationProvider>
  );
};

export default KiemKeTaiSanPage;
