import { Stack } from '@mui/material';
import { DataGridTable } from '@renderer/components/Table';
import { ActionsToolbar } from '@renderer/components/toolbars';
import { ChuyenLop } from '@renderer/features/hoc-vu-sinh-vien/chuyen-lop/types';
import { BaoCaoSVChuyenLopFilter } from '@renderer/features/hoc-vu-sinh-vien/quan-ly-lop-hoc/bao-cao-sv-chuyen-lop/components/BaoCaoSVChuyenLopFilter';
import { columns } from '@renderer/features/hoc-vu-sinh-vien/quan-ly-lop-hoc/bao-cao-sv-chuyen-lop/configs';
import { useCrudPagination } from '@renderer/shared/hooks/use-crud-pagination';

export default function BaoCaoSinhVienChuyenLop() {
  const { data, isRefetching, generateTableConfig, mergeParams } = useCrudPagination<ChuyenLop>({
    entity: 'ChuyenLop',
  });

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
      <BaoCaoSVChuyenLopFilter onApply={mergeParams} />
      <DataGridTable
        columns={columns}
        rows={data?.result ?? []}
        checkboxSelection
        loading={isRefetching}
        {...generateTableConfig(data?.totalCount, isRefetching)}
      />
    </Stack>
  );
}
