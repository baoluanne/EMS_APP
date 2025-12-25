import { Stack } from '@mui/material';
import { DataGridTable } from '@renderer/components/Table';
import {
  capNhatNgayHetHanNopHocPhiLopHocPhanColumns,
  CapNhatNgayHetHanNopHocPhiLopHocPhanFilter,
} from '@renderer/features/hoc-vu-sinh-vien/quan-ly-dang-ky-hoc-phan/cap-nhat-ngay-het-han-nop-hoc-phi-lop-hoc-phan';
import { useTableParams } from '@renderer/shared/hooks/use-table-params';
import { usePaginationQuery } from '@renderer/shared/queries';

const CapNhatNgayHetHanNopHocPhiLopHocPhanPage = () => {
  const { params, generateTableConfig, mergeParams } = useTableParams();

  const { isRefetching, data } = usePaginationQuery<any>(
    'LopHocPhan',
    'pagination',
    params,
    {
      enabled: false,
    }
  );

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
      <CapNhatNgayHetHanNopHocPhiLopHocPhanFilter onApply={(values) => mergeParams(values)} />

      <DataGridTable
        height={300}
        columns={capNhatNgayHetHanNopHocPhiLopHocPhanColumns}
        rows={data?.result}
        checkboxSelection
        getRowId={(row) => row.id}
        loading={isRefetching}
        {...generateTableConfig(data?.totalCount || 0)}
      />
    </Stack>
  );
};

export default CapNhatNgayHetHanNopHocPhiLopHocPhanPage;
