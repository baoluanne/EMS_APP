import { Stack } from '@mui/material';
import { GridColumnVisibilityModel } from '@mui/x-data-grid';
import { DataGridTable } from '@renderer/components/Table';
import { ActionsToolbar } from '@renderer/components/toolbars';
import {
  thongKeTiepNhanHoSoSinhVienColumns,
  ThongKeTiepNhanHoSoSinhVienFilters,
} from '@renderer/features/hoc-vu-sinh-vien/thong-ke-tiep-nhan-ho-so-sinh-vien';
import { TiepNhanHoSoSv } from '@renderer/features/hoc-vu-sinh-vien/thong-ke-tiep-nhan-ho-so-sinh-vien/types';
import { useCrudPagination } from '@renderer/shared/hooks/use-crud-pagination';
import { useState } from 'react';

export default function ThongKeTiepNhanHoSoSinhVien() {
  const { data, isRefetching, generateTableConfig, mergeParams } =
    useCrudPagination<TiepNhanHoSoSv>({
      entity: 'TiepNhanHoSoSv/thong-ke',
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
      <ActionsToolbar onExport={() => {}} />

      <ThongKeTiepNhanHoSoSinhVienFilters
        onApply={mergeParams}
        onClear={() => {
          mergeParams({});
        }}
      />

      <DataGridTable
        columns={thongKeTiepNhanHoSoSinhVienColumns}
        rows={data?.result}
        checkboxSelection={true}
        loading={isRefetching}
        optimizeGrid={false}
        height={'calc(100% - 85px)'}
        {...tableConfig}
      />
    </Stack>
  );
}
