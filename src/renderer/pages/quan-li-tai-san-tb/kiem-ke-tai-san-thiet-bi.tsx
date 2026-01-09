import { Stack } from '@mui/material';
import { FormProvider } from 'react-hook-form';
import { DataGridTable } from '@renderer/components/Table';
import { DeleteConfirmationModal, FormDetailsModal } from '@renderer/components/modals';
import { ActionsToolbar } from '@renderer/components/toolbars';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';
import { KiemKeTaiSanForm } from '../../features/equip-management/kiem-ke-tai-san/components/kiem-ke-tai-san-form';
import { KiemKeTaiSanFilter } from '../../features/equip-management/kiem-ke-tai-san/components/kiem-ke-tai-san-filter';
import { kiemKeTaiSanTableColumns as columns } from '../../features/equip-management/kiem-ke-tai-san/configs/table.configs';
import { KiemKeTaiSanFilterState } from '../../features/equip-management/kiem-ke-tai-san/type';
import {
  KiemKeTaiSan,
  kiemKeTaiSanSchema,
} from '../../features/equip-management/kiem-ke-tai-san/validation';
import React, { useMemo, useCallback } from 'react';
import { TITLE_MODE } from '@renderer/shared/enums';

const defaultValues = {
  id: undefined,
  tenDotKiemKe: undefined,
  ngayBatDau: undefined,
  ngayKetThuc: undefined,
  daHoanThanh: undefined,
  ghiChu: undefined,
};

const formatDateForInput = (dateString: string | null | undefined): string => {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  } catch {
    return '';
  }
};

const formatDateForSave = (dateString: string | null | undefined): string | null => {
  if (!dateString) return null;
  if (dateString.includes('T')) return dateString;
  return `${dateString}T00:00:00Z`;
};

const KiemKeTaiSanPage = () => {
  const [filters, setFilters] = React.useState<KiemKeTaiSanFilterState>({});

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

  const rawRowsData: KiemKeTaiSan[] = React.useMemo(() => {
    if (!data) {
      return [];
    }
    if ('data' in data && Array.isArray(data.data)) {
      return data.data;
    }
    if ('result' in data && Array.isArray(data.result)) {
      return data.result;
    }
    return [];
  }, [data]);

  const rowsData: KiemKeTaiSan[] = useMemo(() => {
    if (!filters.tenDotKiemKe && !filters.ngayBatDau && !filters.ngayKetThuc) {
      return rawRowsData;
    }

    return rawRowsData.filter((row) => {
      const matchTenDotKiemKe =
        !filters.tenDotKiemKe ||
        row.tenDotKiemKe?.toLowerCase().includes(filters.tenDotKiemKe.toLowerCase());

      const matchNgayBatDau =
        !filters.ngayBatDau ||
        row.ngayBatDau?.toLowerCase().includes(filters.ngayBatDau.toLowerCase());

      const matchNgayKetThuc =
        !filters.ngayKetThuc ||
        row.ngayKetThuc?.toLowerCase().includes(filters.ngayKetThuc.toLowerCase());

      return matchTenDotKiemKe && matchNgayBatDau && matchNgayKetThuc;
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
      const rowData = {
        ...params.row,
        ngayBatDau: formatDateForInput(params.row.ngayBatDau),
        ngayKetThuc: formatDateForInput(params.row.ngayKetThuc),
      };
      formMethods.reset(rowData);
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
              columns: columns,
              options: { dataOption, columnOption },
              columnVisibilityModel,
              fileName: 'Danh_sach_kiem_ke_tai_san',
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
