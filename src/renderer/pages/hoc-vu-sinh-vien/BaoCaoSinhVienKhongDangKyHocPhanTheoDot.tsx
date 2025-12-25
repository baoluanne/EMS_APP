import { Stack } from '@mui/material';
import { DataGridTable } from '@renderer/components/Table';
import { ActionsToolbar } from '@renderer/components/toolbars';
import {
  baoCaoSinhVienKhongDangKyHocPhanTheoDotColumns,
  BaoCaoSinhVienKhongDangKyHocPhanTheoDotFilter,
} from '@renderer/features/hoc-vu-sinh-vien/bao-cao/bao-cao-sinh-vien-khong-dang-ky-hoc-phan-theo-dot';
import { useCrudPagination } from '@renderer/shared/hooks/use-crud-pagination';
import { SinhVien } from '@renderer/shared/types';

const BaoCaoSinhVienKhongDangKyHocPhanTheoDotPage = () => {
  const { data, isRefetching, generateTableConfig, mergeParams } = useCrudPagination<SinhVien>({
    entity: 'BaoCaoSinhVienKhongDangKyHocPhanTheoDot',
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
      <BaoCaoSinhVienKhongDangKyHocPhanTheoDotFilter onApply={(values) => mergeParams(values)} />
      <DataGridTable
        columns={baoCaoSinhVienKhongDangKyHocPhanTheoDotColumns}
        rows={data?.result ?? []}
        checkboxSelection
        loading={isRefetching}
        {...generateTableConfig(data?.totalCount, isRefetching)}
      />
    </Stack>
  );
};

export default BaoCaoSinhVienKhongDangKyHocPhanTheoDotPage;
