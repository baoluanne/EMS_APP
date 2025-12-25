import { Stack } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { DiemAlert } from '@renderer/components/alerts';
import { DataGridTable } from '@renderer/components/Table';
import {
  khoaChuongTrinhKhungDefaultFilter,
  KhoaChuongTrinhKhungFilter,
} from '@renderer/features/khoa-chuong-trinh-khung/components/KhoaChuongTrinhKhungFilter';
import { khoaChuongTrinhKhungColumns } from '@renderer/features/khoa-chuong-trinh-khung/configs';
import { useCrudPagination } from '@renderer/shared/hooks/use-crud-pagination';
import { useInsertMutation } from '@renderer/shared/mutations';
import { KhoaChuongTrinhKhung } from '@renderer/shared/types/khoa-chuong-trinh-khung.types';

interface KhoaChuongTrinhKhungEntity {
  idCoSoDaoTao?: string;
  idKhoaHoc?: string;
  idBacDaoTao?: string;
  idLoaiDaoTao?: string;
  idNganhHoc?: string;
  idChuyenNganh?: string;

  isNienChe?: boolean;
}

const KhoaChuongTrinhKhungPage = () => {
  const { mutateAsync: onSubmitChuongTrinhKhungTinChiAsync } = useInsertMutation(
    'ChuongTrinhKhungTinChi/block',
  );
  const { mutateAsync: onSubmitChuongTrinhKhungNienCheAsync } = useInsertMutation(
    'ChuongTrinhKhungNienChe/block',
  );

  const { data, isRefetching, mergeParams, refetch } =
    useCrudPagination<KhoaChuongTrinhKhungEntity>({
      entity: 'ChuongTrinhKhungMerged',
    });

  const handleToggleBlock = async (data: KhoaChuongTrinhKhungEntity, isBlock: boolean) => {
    const isCTKhungTC = !data.isNienChe;
    const payload = { ...data, isBlock };
    if (isCTKhungTC) {
      await onSubmitChuongTrinhKhungTinChiAsync(payload);
    } else {
      await onSubmitChuongTrinhKhungNienCheAsync(payload);
    }
    refetch();
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
      <DiemAlert sx={{ my: 1, pl: 1, py: 0 }} />
      <KhoaChuongTrinhKhungFilter
        onApply={mergeParams}
        onClear={() => {
          mergeParams(khoaChuongTrinhKhungDefaultFilter);
        }}
      />
      <DataGridTable
        columns={
          khoaChuongTrinhKhungColumns(handleToggleBlock) as GridColDef<KhoaChuongTrinhKhung>[]
        }
        rows={data?.result}
        loading={isRefetching}
        checkboxSelection={false}
        height={'calc(100% - 85px)'}
      />

      
    </Stack>
  );
};

export default KhoaChuongTrinhKhungPage;
