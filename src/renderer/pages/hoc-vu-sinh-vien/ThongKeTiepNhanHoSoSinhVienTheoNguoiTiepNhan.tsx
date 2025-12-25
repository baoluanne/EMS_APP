import { Stack, Typography } from '@mui/material';
import { GridColumnVisibilityModel } from '@mui/x-data-grid';
import { DataGridTable } from '@renderer/components/Table';
import { ActionsToolbar } from '@renderer/components/toolbars';
import {
  danhSachNguoiTiepNhanColumns,
  danhSachSinhVienColumns,
  defaultThongKeTiepNhanHoSoSinhVienTheoNguoiTiepNhanFilter,
  ThongKeTiepNhanHoSoSinhVienTheoNguoiTiepNhanFilters,
} from '@renderer/features/hoc-vu-sinh-vien/thong-ke-tiep-nhan-ho-so-sinh-vien-theo-nguoi-tiep-nhan';
import { useCrudPagination } from '@renderer/shared/hooks/use-crud-pagination';
import { useState } from 'react';

export default function ThongKeTiepNhanHoSoSinhVienTheoNguoiTiepNhan() {
  const {
    data,
    isRefetching,
    handleRowSelectionModelChange,
    selectedRows,
    generateTableConfig,
    mergeParams,
  } = useCrudPagination<any>({
    entity: '',
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
      <ActionsToolbar selectedRowIds={selectedRows} onExport={() => {}} onPrint={() => {}} />

      <ThongKeTiepNhanHoSoSinhVienTheoNguoiTiepNhanFilters
        onApply={mergeParams}
        onClear={() => {
          mergeParams(defaultThongKeTiepNhanHoSoSinhVienTheoNguoiTiepNhanFilter);
        }}
      />

      <Typography fontSize={13} fontWeight={600} mt={2}>
        Danh sách người tiếp nhận
      </Typography>
      <DataGridTable
        columns={danhSachNguoiTiepNhanColumns}
        rows={data?.result}
        checkboxSelection
        loading={isRefetching}
        onRowSelectionModelChange={handleRowSelectionModelChange}
        rowSelectionModel={selectedRows}
        height={'calc(100% - 85px)'}
        {...tableConfig}
      />

      <Typography fontSize={13} fontWeight={600}>
        Danh sách sinh viên
      </Typography>
      <DataGridTable
        columns={danhSachSinhVienColumns}
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
