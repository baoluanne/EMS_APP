import { Stack } from '@mui/material';
import { DataGridTable } from '@renderer/components/Table';
import { ActionsToolbar } from '@renderer/components/toolbars';
import {
  traCuuLichHocLichThiSVColumns,
  TraCuuLichHocLichThiSVFilter,
} from '@renderer/features/hoc-vu-sinh-vien/quan-ly-sinh-vien/tra-cuu-lich-hoc-lich-thi-sv';
import { useCrudPagination } from '@renderer/shared/hooks/use-crud-pagination';

export default function TraCuuLichHocLichThiSinhVien() {
  const { data, generateTableConfig, isRefetching, mergeParams } = useCrudPagination<any>({
    entity: 'ThoiKhoaBieu',
    enableOnParams: (params) => !!params.idDot && !!params.maSinhVien,
  });

  console.log(JSON.stringify(data?.result[0]));

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
      <ActionsToolbar selectedRowIds={{} as any} onExport={() => {}} />
      <TraCuuLichHocLichThiSVFilter onApply={mergeParams} />
      <DataGridTable
        columns={traCuuLichHocLichThiSVColumns}
        rows={data?.result ?? []}
        checkboxSelection={false}
        loading={isRefetching}
        {...generateTableConfig(data?.totalCount)}
      />
    </Stack>
  );
}
