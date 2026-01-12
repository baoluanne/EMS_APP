import { useMemo, useCallback, useState } from 'react';
import { Stack } from '@mui/material';
import { FormProvider } from 'react-hook-form';
import { DataGridTable } from '@renderer/components/Table';
import { DeleteConfirmationModal, FormDetailsModal } from '@renderer/components/modals';
import { ActionsToolbar } from '@renderer/components/toolbars';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';
import { TITLE_MODE } from '@renderer/shared/enums';

import { KiemKeTaiSanForm } from '../../features/equip-management/kiem-ke-tai-san/components/kiem-ke-tai-san-form';
import { KiemKeTaiSanFilter } from '../../features/equip-management/kiem-ke-tai-san/components/kiem-ke-tai-san-filter';
import { kiemKeTaiSanTableColumns } from '../../features/equip-management/kiem-ke-tai-san/configs/table.configs';
import { KiemKeTaiSanFilterState } from '../../features/equip-management/kiem-ke-tai-san/type';
import {
  KiemKeTaiSan,
  kiemKeTaiSanSchema,
} from '../../features/equip-management/kiem-ke-tai-san/validation';
import { ChiTietKiemKeModal } from '../../features/equip-management/kiem-ke-tai-san/ChiTietKiemKe/ChiTietKiemKeModal';

const defaultValues = {
  id: undefined,
  tenDotKiemKe: '',
  ngayBatDau: '',
  ngayKetThuc: '',
  daHoanThanh: false,
  ghiChu: '',
};

const getLocalDateFormat = (date: Date | string | null | undefined): string | undefined => {
  if (!date) return undefined;
  const d = new Date(date);
  if (isNaN(d.getTime())) return undefined;
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const formatDateForSave = (dateString: string | null | undefined): string | null => {
  if (!dateString) return null;
  return dateString.includes('T') ? dateString : `${dateString}T00:00:00Z`;
};

const KiemKeTaiSanPage = () => {
  const [filters, setFilters] = useState<KiemKeTaiSanFilterState>({});
  const [detailModal, setDetailModal] = useState<{
    open: boolean;
    id: string | null;
    name: string;
  }>({
    open: false,
    id: null,
    name: '',
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
    onSave: originalOnSave,
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
  });

  const rawRowsData: KiemKeTaiSan[] = useMemo(() => {
    if (!data) return [];
    const responseData = (data as any).data || (data as any).result;
    return Array.isArray(responseData) ? responseData : [];
  }, [data]);

  const handleViewDetail = useCallback(
    (id: string) => {
      const row = rawRowsData.find((r) => r.id === id);
      setDetailModal({ open: true, id, name: row?.tenDotKiemKe || '' });
    },
    [rawRowsData],
  );

  const columns = useMemo(() => kiemKeTaiSanTableColumns(handleViewDetail), [handleViewDetail]);

  const onSave = useCallback(async () => {
    const formData = formMethods.getValues();
    const transformedData = {
      ...formData,
      ngayBatDau: formatDateForSave(formData.ngayBatDau),
      ngayKetThuc: formatDateForSave(formData.ngayKetThuc),
    };
    Object.keys(transformedData).forEach((key) => {
      formMethods.setValue(key as any, transformedData[key as keyof typeof transformedData]);
    });
    await originalOnSave();
  }, [formMethods, originalOnSave]);

  const rowsData: KiemKeTaiSan[] = useMemo(() => {
    if (
      !filters.tenDotKiemKe &&
      !filters.ngayBatDau &&
      !filters.ngayKetThuc &&
      !filters.daHoanThanh
    ) {
      return rawRowsData;
    }
    return rawRowsData.filter((row) => {
      const matchName =
        !filters.tenDotKiemKe ||
        row.tenDotKiemKe?.toLowerCase().includes(filters.tenDotKiemKe.toLowerCase());
      const rowStart = getLocalDateFormat(row.ngayBatDau);
      const rowEnd = getLocalDateFormat(row.ngayKetThuc);
      const matchStart = !filters.ngayBatDau || rowStart === filters.ngayBatDau;
      const matchEnd = !filters.ngayKetThuc || rowEnd === filters.ngayKetThuc;
      const matchStatus = !filters.daHoanThanh || String(row.daHoanThanh) === filters.daHoanThanh;
      return matchName && matchStart && matchEnd && matchStatus;
    });
  }, [rawRowsData, filters]);

  const handleFilterApply = useCallback((filterValues: KiemKeTaiSanFilterState) => {
    setFilters(filterValues);
  }, []);

  const handleFilterReset = useCallback(() => {
    setFilters({});
  }, []);

  const handleRowClick = useCallback(
    (params: any) => {
      formMethods.reset({
        ...params.row,
        ngayBatDau: getLocalDateFormat(params.row.ngayBatDau),
        ngayKetThuc: getLocalDateFormat(params.row.ngayKetThuc),
      });
    },
    [formMethods],
  );

  return (
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

        {isModalOpen && (
          <FormDetailsModal
            title={isAddMode ? 'Thêm mới đợt kiểm kê' : 'Chỉnh sửa đợt kiểm kê'}
            onClose={handleCloseModal}
            onSave={onSave}
            maxWidth="sm"
            titleMode={TITLE_MODE.COLORED}
          >
            <KiemKeTaiSanForm />
          </FormDetailsModal>
        )}

        {detailModal.open && (
          <ChiTietKiemKeModal
            open={detailModal.open}
            dotKiemKeId={detailModal.id}
            tenDotKiemKe={detailModal.name}
            onClose={() => setDetailModal({ ...detailModal, open: false })}
          />
        )}

        {isDeleteOpenModal && (
          <DeleteConfirmationModal
            onClose={() => setIsDeleteOpenModal(false)}
            onDelete={handleDeleteRecord}
          />
        )}

        <KiemKeTaiSanFilter onApply={handleFilterApply} onReset={handleFilterReset} />

        <DataGridTable
          columns={columns}
          rows={rowsData}
          checkboxSelection
          loading={isRefetching}
          onRowClick={handleRowClick}
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

export default KiemKeTaiSanPage;
