import { Stack } from '@mui/material';
import { DataGridTable } from '@renderer/components/Table';
import {
  quyDinhHanNopHocPhiHocKyColumns,
  QuyDinhHanNopHocPhiHocKyFilter,
} from '@renderer/features/hoc-vu-sinh-vien/quan-ly-dang-ky-hoc-phan/quy-dinh-han-nop-hoc-phi-hoc-ky';
import { useTableParams } from '@renderer/shared/hooks/use-table-params';
import { usePaginationQuery } from '@renderer/shared/queries';
import { SinhVien } from '@renderer/shared/types';

const QuyDinhHanNopHocPhiHocKyPage = () => {
  const { params, generateTableConfig, mergeParams } = useTableParams();

  const { isRefetching, data } = usePaginationQuery<SinhVien>('SinhVien', 'pagination', params, {
    enabled: false,
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
      <QuyDinhHanNopHocPhiHocKyFilter onApply={(values) => mergeParams(values)} />

      <DataGridTable
        height={300}
        columns={quyDinhHanNopHocPhiHocKyColumns}
        rows={data?.result}
        checkboxSelection
        getRowId={(row) => row.id}
        loading={isRefetching}
        {...generateTableConfig(data?.totalCount || 0)}
      />
    </Stack>
  );
};

export default QuyDinhHanNopHocPhiHocKyPage;
