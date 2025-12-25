import { Stack, Typography } from '@mui/material';
import { GridRowId, GridRowSelectionModel } from '@mui/x-data-grid';
import { DataGridTable } from '@renderer/components/Table';
import { columns } from '@renderer/features/hoc-vu-sinh-vien/quan-ly-sinh-vien/in-the-sinh-vien';
import { TableConfig, TableParams } from '@renderer/shared/hooks/use-table-params';
import { usePaginationQuery } from '@renderer/shared/queries';
import { SinhVien } from '@renderer/shared/types';

interface Props {
  tableTitle: string;
  params: TableParams;
  generateTableConfig: (total: number | undefined, isPending: boolean) => TableConfig;
  onSelectedRowsChanged: (listSV: SinhVien[]) => void;
  selectedSV: SinhVien[];
}

export const DanhSachSinhVienDataGridTable = ({
  tableTitle,
  params,
  generateTableConfig,
  onSelectedRowsChanged,
  selectedSV,
}: Props) => {
  const { data, isRefetching } = usePaginationQuery<SinhVien, Error>(
    'SinhVien',
    'pagination',
    params,
  );

  const handleRowSelectionModelChange = (model: GridRowSelectionModel) => {
    const rows = [...model.ids].map((id) => data?.result?.find((item) => item.id === id));
    onSelectedRowsChanged(rows.filter(Boolean) as SinhVien[]);
  };

  return (
    <Stack
      className="w-full h-full gap-y-2"
      style={{
        height: '100%',
        width: '100%',
        overflow: 'auto',
        position: 'relative',
        borderRadius: '0px',
      }}
    >
      <Typography>{tableTitle}</Typography>
      <DataGridTable
        columns={columns}
        rows={data?.result.map((item, index) => ({
          index: params.page * params.pageSize + index + 1,
          ...item,
        }))}
        checkboxSelection
        loading={isRefetching}
        height={'calc(100% - 85px)'}
        onRowSelectionModelChange={handleRowSelectionModelChange}
        rowSelectionModel={{
          type: 'include',
          ids: new Set(
            selectedSV
              .map((item) => item.id)
              .filter((id): id is string => id !== undefined) as GridRowId[],
          ),
        }}
        {...generateTableConfig(data?.totalCount, isRefetching)}
      />
    </Stack>
  );
};
