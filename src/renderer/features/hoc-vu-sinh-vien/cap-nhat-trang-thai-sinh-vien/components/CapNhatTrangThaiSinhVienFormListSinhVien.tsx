import { Box, Typography } from '@mui/material';
import { DataGridTable } from '@renderer/components/Table';
import {
  capNhatTrangThaiSinhVienColumns,
  thongTinChungColumns,
} from '../../nhat-ky-cap-nhat-trang-thai-sinh-vien';
import { GridColumnVisibilityModel, GridRowSelectionModel } from '@mui/x-data-grid';
import { useCrudPagination } from '@renderer/shared/hooks/use-crud-pagination';
import { SinhVien } from '@renderer/shared/types';
import { useMemo, useState } from 'react';

interface CapNhatTrangThaiSinhVienFormListSinhVienProps {
  selectedRowIds: GridRowSelectionModel;
}

export const CapNhatTrangThaiSinhVienFormListSinhVien = ({
  selectedRowIds,
}: CapNhatTrangThaiSinhVienFormListSinhVienProps) => {
  const {
    data,
    isRefetching,
    handleRowSelectionModelChange,
    selectedRows,
    generateTableConfig,
    rowIds,
  } = useCrudPagination<SinhVien>({
    entity: 'SinhVien',
    endpoint: `ids?${[...selectedRowIds?.ids].map((id) => `ids=${id}`).join('&')}`,
  });

  const sinhVienData = (data as unknown as SinhVien[]) ?? [];

  const [columnVisibilityModel, setColumnVisibilityModel] = useState<GridColumnVisibilityModel>({});

  const handleColumnChange = (model: GridColumnVisibilityModel) => {
    setColumnVisibilityModel(model);
  };

  const tableConfig = {
    columnVisibilityModel,
    onColumnVisibilityModelChange: handleColumnChange,
    ...generateTableConfig(sinhVienData.length, isRefetching),
  };

  const lastSelectedRow = useMemo(
    () => sinhVienData.find((row) => row['id'] === [...rowIds][rowIds.size - 1]),
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
    <Box mt={3}>
      <DataGridTable
        columns={thongTinChungColumns}
        rows={sinhVienData}
        checkboxSelection
        loading={isRefetching}
        onRowSelectionModelChange={handleRowSelectionModelChange}
        rowSelectionModel={selectedRows}
        height={'calc(100% - 85px)'}
        {...tableConfig}
      />
      <Typography fontSize={13} fontWeight={600}>
        Nhật ký trạng thái
      </Typography>
      <DataGridTable
        columns={capNhatTrangThaiSinhVienColumns}
        rows={nhatKyData?.result ?? []}
        checkboxSelection
        loading={nhatKyIsFetching}
        onRowSelectionModelChange={nhatKyHandleRowSelectionModelChange}
        rowSelectionModel={nhatKySelectedRows}
        height={'calc(100% - 85px)'}
        {...nhatKyTableConfig}
      />
    </Box>
  );
};
