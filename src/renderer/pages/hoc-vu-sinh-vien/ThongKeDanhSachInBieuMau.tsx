import { Stack } from '@mui/material';
import { GridColumnVisibilityModel } from '@mui/x-data-grid';
import { DataGridTable } from '@renderer/components/Table';
import { ActionsToolbar } from '@renderer/components/toolbars';
import { defaultNhatKyCapNhatTrangThaiSinhVienFilter } from '@renderer/features/hoc-vu-sinh-vien/nhat-ky-cap-nhat-trang-thai-sinh-vien';
import {
  ThongKeDanhSachInBieuMauFilters,
  thongKeInBieuMauColumns,
} from '@renderer/features/hoc-vu-sinh-vien/thong-ke-danh-sach-in-bieu-mau';
import { useCrudPagination } from '@renderer/shared/hooks/use-crud-pagination';
import { useState } from 'react';

export default function ThongKeDanhSachInBieuMau() {
  const {
    data,
    isRefetching,
    handleRowSelectionModelChange,
    selectedRows,
    generateTableConfig,
    mergeParams,
  } = useCrudPagination<any>({
    entity: 'ThongKeInBieuMau',
  });

  const [columnVisibilityModel, setColumnVisibilityModel] = useState<GridColumnVisibilityModel>({});

  const handleColumnChange = (model: GridColumnVisibilityModel) => {
    setColumnVisibilityModel(model);
  };

  const tableConfig = {
    columnVisibilityModel,
    onColumnVisibilityModelChange: handleColumnChange,
    ...generateTableConfig(data?.totalCount, isRefetching),
  };

  return (
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
        onDelete={() => {}}
        onExport={() => {}}
        onPrint={() => {}}
      />

      <ThongKeDanhSachInBieuMauFilters
        onApply={mergeParams}
        onClear={() => {
          mergeParams(defaultNhatKyCapNhatTrangThaiSinhVienFilter);
        }}
      />

      <DataGridTable
        columns={thongKeInBieuMauColumns}
        rows={data?.result}
        checkboxSelection
        loading={isRefetching}
        onRowSelectionModelChange={handleRowSelectionModelChange}
        rowSelectionModel={selectedRows}
        height={'calc(100% - 85px)'}
        {...tableConfig}
      />
    </Stack>
  );
}
