import { useMemo, useState } from 'react';
import { Button, Stack, Typography, Collapse } from '@mui/material';
import { FormProvider } from 'react-hook-form';
import { Add, Business, Analytics, KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
import { DataGridTable } from '@renderer/components/Table';
import {
  DeleteConfirmationModal as DeleteModal,
  FormDetailsModal,
} from '@renderer/components/modals';
import { ActionsToolbar } from '@renderer/components/toolbars';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';
import { TITLE_MODE } from '@renderer/shared/enums';
import { DanhSachThietBiForm } from '../../features/equip-management/danh-sach-thiet-bi/components/danh-sach-thiet-bi-form';
import { DanhSachThietBiFilter } from '../../features/equip-management/danh-sach-thiet-bi/components/danh-sach-thiet-bi-filter';
import { NhapHangLoatModal } from '../../features/equip-management/danh-sach-thiet-bi/NhapHangLoatModal';
import { AssignRoomModal } from '../../features/equip-management/danh-sach-thiet-bi/components/AssignRoomModal';
import { DeviceStatsBoard } from '../../features/equip-management/danh-sach-thiet-bi/components/DeviceStatsBoard';
import { danhSachThietBiColumns as columns } from '../../features/equip-management/danh-sach-thiet-bi/configs/table.configs';
import { DanhSachThietBiFilterState } from '../../features/equip-management/danh-sach-thiet-bi/type';
import {
  DanhSachThietBi,
  danhSachThietBiSchema,
} from '../../features/equip-management/danh-sach-thiet-bi/validation';
import { getTrangThaiLabel } from '../../features/equip-management/danh-sach-thiet-bi/TrangThaiThietBiEnum';

const UNASSIGNED_LOCATION = 'chua phan bo';
const TABLE_HEIGHT = 'calc(100% - 200px)';

const DanhSachThietBiPage = () => {
  const [filters, setFilters] = useState<DanhSachThietBiFilterState>({});
  const [modals, setModals] = useState({
    nhapHangLoat: false,
    assignRoom: false,
  });
  const [showStats, setShowStats] = useState(true);

  const crudHandlers = useCrudPaginationModal<DanhSachThietBi, DanhSachThietBi>({
    defaultValues: { tenThietBi: '' },
    schema: danhSachThietBiSchema,
    entity: 'ThietBi',
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
    onSave,
    handleDeleteRecord,
    selectedRows,
    setIsDeleteOpenModal,
    handleCloseModal,
    isAddMode,
    tableConfig,
    refetch,
  } = crudHandlers;

  const selectedIds = useSelectedIds(selectedRows);
  const rowsData = useFilteredRows(data, filters);
  const currentSelectedData = useCurrentSelectedData(rowsData, selectedIds);

  return (
    <FormProvider {...formMethods}>
      <Stack height="100%" p={2} spacing={2} sx={{ overflowY: 'auto', bgcolor: '#f8fafc' }}>
        <StatsHeader showStats={showStats} onToggle={() => setShowStats(!showStats)} />

        <Collapse in={showStats} sx={{ pb: 1 }}>
          <DeviceStatsBoard data={rowsData} loading={isRefetching} />
        </Collapse>

        <DanhSachThietBiFilter onApply={setFilters} onReset={() => setFilters({})} />

        <ActionsToolbar
          selectedRowIds={selectedRows}
          onDelete={() => setIsDeleteOpenModal(true)}
          onAdd={onAdd}
          onEdit={onEdit}
          onExport={(dOpt, cOpt) =>
            handleExport(rowsData, tableConfig.columnVisibilityModel, dOpt, cOpt)
          }
          customStartActions={
            <CustomActions
              onBulkImport={() => setModals({ ...modals, nhapHangLoat: true })}
              onAssignRoom={() => setModals({ ...modals, assignRoom: true })}
              hasSelection={selectedIds.length > 0}
            />
          }
        />

        <DataGridTable
          columns={columns}
          rows={rowsData}
          checkboxSelection
          loading={isRefetching}
          getRowId={(r) => r.id!}
          onRowSelectionModelChange={handleRowSelectionModelChange}
          rowSelectionModel={selectedRows}
          height={TABLE_HEIGHT}
          {...tableConfig}
        />

        <DeviceFormModal
          isOpen={isModalOpen}
          isAddMode={isAddMode}
          onClose={handleCloseModal}
          onSave={onSave}
        />

        {modals.nhapHangLoat && (
          <NhapHangLoatModal
            open={modals.nhapHangLoat}
            onClose={() => setModals({ ...modals, nhapHangLoat: false })}
            onSuccess={refetch}
          />
        )}

        {modals.assignRoom && (
          <AssignRoomModal
            selectedIds={selectedIds}
            initialData={currentSelectedData}
            onClose={() => setModals({ ...modals, assignRoom: false })}
            onSuccess={refetch}
          />
        )}

        {isDeleteOpenModal && (
          <DeleteModal
            onClose={() => setIsDeleteOpenModal(false)}
            onDelete={async () => {
              await handleDeleteRecord();
              refetch();
            }}
          />
        )}
      </Stack>
    </FormProvider>
  );
};

export default DanhSachThietBiPage;

// ============================================================================
// Custom Hooks
// ============================================================================

function useSelectedIds(selectedRows: any): string[] {
  return useMemo(
    () => Array.from((selectedRows as any)?.ids || []).map((id) => String(id)),
    [selectedRows],
  );
}

function useFilteredRows(data: any, filters: DanhSachThietBiFilterState): any[] {
  return useMemo(() => {
    const raw = (data as any)?.result || [];
    return raw.filter((row: any) => applyAllFilters(row, filters));
  }, [data, filters]);
}

function useCurrentSelectedData(rowsData: any[], selectedIds: string[]): any {
  return useMemo(() => rowsData.find((r: any) => r.id === selectedIds[0]), [rowsData, selectedIds]);
}

// ============================================================================
// Filter Functions
// ============================================================================

function applyAllFilters(row: any, filters: DanhSachThietBiFilterState): boolean {
  return (
    applyBasicFilters(row, filters) &&
    applyLocationFilter(row, filters) &&
    applyStatusFilter(row, filters)
  );
}

function applyBasicFilters(row: any, filters: DanhSachThietBiFilterState): boolean {
  return (
    matchesField(row.maThietBi, filters.maThietBi) &&
    matchesField(row.tenThietBi, filters.tenThietBi) &&
    matchesField(row.model, filters.model) &&
    matchesField(row.serialNumber, filters.serialNumber)
  );
}

function applyLocationFilter(row: any, filters: DanhSachThietBiFilterState): boolean {
  const viTri = (filters as any).viTri;
  if (!viTri) return true;

  const cleanSearch = removeAccents(viTri);

  if (cleanSearch === UNASSIGNED_LOCATION) {
    return !row.phongHocId && !row.phongKtxId;
  }

  const tenPhong = removeAccents(row.phongHoc?.tenPhong || '');
  const maKtx = removeAccents(row.phongKtx?.maPhong || '');

  return tenPhong.includes(cleanSearch) || maKtx.includes(cleanSearch);
}

function applyStatusFilter(row: any, filters: DanhSachThietBiFilterState): boolean {
  const trangThaiText = (filters as any).trangThaiText;
  if (!trangThaiText) return true;

  const searchVal = removeAccents(trangThaiText);
  const label = removeAccents(getTrangThaiLabel(row.trangThai));

  return label.includes(searchVal);
}

function matchesField(value: string | undefined, filter: string | undefined): boolean {
  if (!filter) return true;
  return removeAccents(value || '').includes(removeAccents(filter));
}

function removeAccents(str: string): string {
  return str
    ? str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D')
        .toLowerCase()
    : '';
}

// ============================================================================
// Utility Functions
// ============================================================================

function handleExport(
  rowsData: any[],
  columnVisibilityModel: any,
  dataOption: any,
  columnOption: any,
) {
  exportPaginationToExcel({
    entity: 'ThietBi',
    filteredData: rowsData,
    columns,
    options: { dataOption, columnOption },
    columnVisibilityModel,
    fileName: 'Danh_sach_thiet_bi',
  });
}

// ============================================================================
// Components
// ============================================================================

interface StatsHeaderProps {
  showStats: boolean;
  onToggle: () => void;
}

function StatsHeader({ showStats, onToggle }: StatsHeaderProps) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Stack direction="row" alignItems="center" spacing={1}>
        <Analytics color="action" fontSize="small" />
        <Typography variant="overline" fontWeight={700} color="text.secondary">
          BÁO CÁO THIẾT BỊ
        </Typography>
      </Stack>
      <Button
        size="small"
        variant="text"
        onClick={onToggle}
        startIcon={showStats ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        sx={{ fontWeight: 700 }}
      >
        {showStats ? 'Thu gọn thống kê' : 'Mở rộng thống kê'}
      </Button>
    </Stack>
  );
}

interface CustomActionsProps {
  onBulkImport: () => void;
  onAssignRoom: () => void;
  hasSelection: boolean;
}

function CustomActions({ onBulkImport, onAssignRoom, hasSelection }: CustomActionsProps) {
  return (
    <Stack direction="row" spacing={1}>
      <Button size="small" startIcon={<Add />} onClick={onBulkImport}>
        Nhập hàng loạt
      </Button>
      <Button
        size="small"
        color="secondary"
        startIcon={<Business />}
        disabled={!hasSelection}
        onClick={onAssignRoom}
      >
        Phân phòng
      </Button>
    </Stack>
  );
}

interface DeviceFormModalProps {
  isOpen: boolean;
  isAddMode: boolean;
  onClose: () => void;
  onSave: () => void;
}

function DeviceFormModal({ isOpen, isAddMode, onClose, onSave }: DeviceFormModalProps) {
  if (!isOpen) return null;

  return (
    <FormDetailsModal
      title={isAddMode ? 'Thêm mới' : 'Sửa'}
      onClose={onClose}
      onSave={onSave}
      maxWidth="sm"
      titleMode={TITLE_MODE.COLORED}
    >
      <DanhSachThietBiForm />
    </FormDetailsModal>
  );
}
