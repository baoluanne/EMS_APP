import { Stack, Typography } from '@mui/material';
import { GridColumnVisibilityModel } from '@mui/x-data-grid';
import { DataGridTable } from '@renderer/components/Table';
import { ActionsToolbar } from '@renderer/components/toolbars';
import {
  capNhatTrangThaiSinhVienColumns,
  defaultNhatKyCapNhatTrangThaiSinhVienFilter,
  NhatKyCapNhatTrangThaiSinhVienFilters,
  thongTinChungColumns,
} from '@renderer/features/hoc-vu-sinh-vien/nhat-ky-cap-nhat-trang-thai-sinh-vien';
import { useCrudPagination } from '@renderer/shared/hooks/use-crud-pagination';
import { SinhVien } from '@renderer/shared/types';
import { useMemo, useState } from 'react';

export default function NhatKyCapNhatTrangThaiSinhVien() {
  const {
    data,
    isRefetching,
    handleRowSelectionModelChange,
    selectedRows,
    generateTableConfig,
    mergeParams,
    rowIds,
  } = useCrudPagination<SinhVien>({
    entity: 'NhatKyCapNhatTrangThaiSv',
    endpoint: 'pagination/sinhvien',
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

  const lastSelectedRow = useMemo(
    () => (data?.result ?? []).find((row) => row['id'] === [...rowIds][rowIds.size - 1]),
    [data, rowIds],
  );

  const {
    data: nhatKyData,
    isRefetching: nhatKyIsFetching,
    handleRowSelectionModelChange: nhatKyHandleRowSelectionModelChange,
    selectedRows: nhatKySelectedRows,
    generateTableConfig: nhatKyGenerateTableConfig,
  } = useCrudPagination<SinhVien>({
    entity: 'NhatKyCapNhatTrangThaiSv',
    endpoint: `sinhvien/${lastSelectedRow?.id}`,
    enabled: !!lastSelectedRow?.id,
    defaultState: {
      pageSize: 100,
    },
  });

  const [nhatKyColumnVisibilityModel, setNhatKyColumnVisibilityModel] =
    useState<GridColumnVisibilityModel>({});

  const handleNhatKyColumnChange = (model: GridColumnVisibilityModel) => {
    setNhatKyColumnVisibilityModel(model);
  };

  const nhatKyTableConfig = {
    columnVisibilityModel: nhatKyColumnVisibilityModel,
    onColumnVisibilityModelChange: handleNhatKyColumnChange,
    ...nhatKyGenerateTableConfig(data?.totalCount, isRefetching),
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

      <NhatKyCapNhatTrangThaiSinhVienFilters
        onApply={mergeParams}
        onClear={() => {
          mergeParams(defaultNhatKyCapNhatTrangThaiSinhVienFilter);
        }}
      />

      <Typography fontSize={13} fontWeight={600} mt={2}>
        Thông tin chung
      </Typography>
      <DataGridTable
        columns={thongTinChungColumns}
        rows={data?.result}
        checkboxSelection
        loading={isRefetching}
        onRowSelectionModelChange={handleRowSelectionModelChange}
        rowSelectionModel={selectedRows}
        height={'calc(100% - 85px)'}
        {...tableConfig}
      />

      <Typography fontSize={13} fontWeight={600}>
        Danh sách cập nhật trạng thái sinh viên
      </Typography>
      <DataGridTable
        columns={capNhatTrangThaiSinhVienColumns}
        rows={nhatKyData?.result}
        checkboxSelection
        loading={nhatKyIsFetching}
        onRowSelectionModelChange={nhatKyHandleRowSelectionModelChange}
        rowSelectionModel={nhatKySelectedRows}
        height={'calc(100% - 85px)'}
        {...nhatKyTableConfig}
      />
    </Stack>
  );
}
