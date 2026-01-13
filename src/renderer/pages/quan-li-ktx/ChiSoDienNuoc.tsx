import { Stack, Box } from '@mui/material';
import { FormProvider } from 'react-hook-form';
import { DeleteConfirmationModal, FormDetailsModal } from '@renderer/components/modals';
import { DataGridTable } from '@renderer/components/Table';
import { ActionsToolbar } from '@renderer/components/toolbars';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';

import { columns } from '@renderer/features/ktx-management/chi-so-dien-nuoc/configs/table.configs';
import { ChiSoDienNuocFilter } from '@renderer/features/ktx-management/chi-so-dien-nuoc/components/ChiSoDienNuocFilter';
import { ChiSoDienNuocForm } from '@renderer/features/ktx-management/chi-so-dien-nuoc/components/ChiSoDienNuocForm';
import { ChiSoDienNuocFilterState } from '@renderer/features/ktx-management/chi-so-dien-nuoc/type';
import {
  chiSoDienNuocSchema,
  defaultValues,
} from '@renderer/features/ktx-management/chi-so-dien-nuoc/validation';

import React, { useMemo, useCallback } from 'react';
import dayjs from 'dayjs';
import { z } from 'zod';
import { TITLE_MODE } from '@renderer/shared/enums';

// Fix lỗi TS2749: Lấy Type từ Schema
type ChiSoDienNuocType = z.infer<typeof chiSoDienNuocSchema>;

/**
 * Chuyển đổi format "MM/YYYY" từ API sang Date object cho DatePicker
 */
const parseThangNamToDate = (thangNamStr: string) => {
  if (!thangNamStr || typeof thangNamStr !== 'string') return new Date();
  const match = thangNamStr.match(/(\d+)\/(\d+)/);
  if (match) {
    const month = parseInt(match[1], 10);
    const year = parseInt(match[2], 10);
    return new Date(year, month - 1, 1);
  }
  return new Date();
};

export default function ChiSoDienNuocPage() {
  const [filters, setFilters] = React.useState<ChiSoDienNuocFilterState>({});

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
  } = useCrudPaginationModal<ChiSoDienNuocType, ChiSoDienNuocType>({
    defaultValues,
    schema: chiSoDienNuocSchema,
    entity: 'ChiSoDienNuoc',

    // --- XỬ LÝ KHI MỞ MODAL EDIT ---
    beforeEdit: (row: any) => {
      return {
        ...row,
        // 1. Chuyển chuỗi tháng/năm thành Date để DatePicker không bị lỗi
        thangNam: parseThangNamToDate(row.thangNam),

        // 2. QUAN TRỌNG: Xử lý Nhà cung cấp (Provider)
        // Nếu API trả về object nhaCungCap: { id: 1, ten: '...' }
        // Ta cần gán ID vào field tương ứng trong Form (thường là idNhaCungCap)
        idNhaCungCap: row.nhaCungCap?.id || row.idNhaCungCap,
      };
    },

    // --- XỬ LÝ KHI NHẤN LƯU (SUBMIT) ---
    beforeSubmit: (formData: any) => {
      const d = dayjs(formData.thangNam);

      // Tạo payload sạch để gửi lên API
      const payload = {
        ...formData,
        thang: d.month() + 1,
        nam: d.year(),
      };

      // Xóa bỏ trường thangNam (vì Backend thường nhận thang/nam riêng lẻ)
      // Nếu Backend cần idNhaCungCap, đảm bảo nó là số (Number)
      if (payload.idNhaCungCap) {
        payload.idNhaCungCap = Number(payload.idNhaCungCap);
      }

      delete payload.thangNam;
      return payload;
    },
  });

  // Lấy raw data từ API response
  const rawRowsData: ChiSoDienNuocType[] = React.useMemo(() => {
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

  // Chuyển đổi dữ liệu bảng - áp dụng filter
  const rowsData: ChiSoDienNuocType[] = useMemo(() => {
    if (
      !filters.toaNhaId &&
      !filters.phongId &&
      !filters.thang &&
      !filters.nam &&
      filters.daChot === undefined
    ) {
      return rawRowsData;
    }

    return rawRowsData.filter((row) => {
      const matchToaNha = !filters.toaNhaId || row.toaNhaId?.toString() === filters.toaNhaId;

      const matchPhong = !filters.phongId || row.phongKtxId?.toString() === filters.phongId;

      const matchThang = !filters.thang || dayjs(row.thangNam).month() + 1 === filters.thang;

      const matchNam = !filters.nam || dayjs(row.thangNam).year() === filters.nam;

      const matchDaChot = filters.daChot === undefined || row.daChot === filters.daChot;

      return matchToaNha && matchPhong && matchThang && matchNam && matchDaChot;
    });
  }, [rawRowsData, filters]);

  const handleFilterApply = useCallback((filterValues: ChiSoDienNuocFilterState) => {
    setFilters(filterValues);
  }, []);

  // ✅ FIX: Click vào row mở edit
  const handleRowClick = useCallback(
    (params: any) => {
      formMethods.reset(params.row);
      onEdit();
    },
    [formMethods, onEdit],
  );

  // ✅ FIX: Edit từ toolbar checkbox
  const handleEditSelected = useCallback(() => {
    if (Array.isArray(selectedRows) && selectedRows.length === 1) {
      const selectedRow = rowsData.find((r: any) => r.id === selectedRows[0]);
      if (selectedRow) {
        formMethods.reset(selectedRow);
        onEdit();
      }
    }
  }, [selectedRows, rowsData, formMethods, onEdit]);

  return (
    <FormProvider {...formMethods}>
      <Stack height="100%" width="100%" p={2} spacing={2}>
        <ActionsToolbar
          selectedRowIds={selectedRows}
          onDelete={() => setIsDeleteOpenModal(true)}
          onAdd={onAdd}
          onEdit={handleEditSelected}
          onExport={(dataOption, columnOption) =>
            exportPaginationToExcel({
              entity: 'ChiSoDienNuoc',
              filteredData: rowsData,
              columns: columns,
              options: { dataOption, columnOption },
              columnVisibilityModel: columnVisibilityModel || {},
              fileName: 'danh_sach_chi_so_dien_nuoc',
            })
          }
        />

        {/* Modal chi tiết (Thêm/Sửa) */}
        {isModalOpen && (
          <FormDetailsModal
            title={isAddMode ? 'Ghi chỉ số điện nước mới' : 'Cập nhật chỉ số điện nước'}
            onClose={handleCloseModal}
            onSave={() => onSave()}
            maxWidth="sm"
            titleMode={TITLE_MODE.COLORED}
          >
            <ChiSoDienNuocForm />
          </FormDetailsModal>
        )}

        {/* Modal xác nhận xóa */}
        {isDeleteOpenModal && (
          <DeleteConfirmationModal
            onClose={() => setIsDeleteOpenModal(false)}
            onDelete={handleDeleteRecord}
          />
        )}

        {/* Bộ lọc */}
        <ChiSoDienNuocFilter onApply={handleFilterApply} />

        {/* Bảng hiển thị */}
        <Box sx={{ flexGrow: 1, mt: 1, minHeight: 400 }}>
          <DataGridTable
            columns={columns}
            rows={rowsData}
            loading={isRefetching}
            onRowClick={handleRowClick}
            onRowSelectionModelChange={handleRowSelectionModelChange}
            rowSelectionModel={selectedRows}
            getRowId={(row) => row.id}
            {...tableConfig}
            checkboxSelection
            disableRowSelectionOnClick
            height="calc(100% - 85px)"
          />
        </Box>
      </Stack>
    </FormProvider>
  );
}
