import { DataGridTable } from '@renderer/components/Table';
import { chuongTrinhKhungTinChiSideTableColumns } from '@renderer/features/chuong-trinh-khung-tin-chi';

export const XemPhanMonLopHocSideTable = () => {
  return (
    <DataGridTable
      height={1}
      columns={chuongTrinhKhungTinChiSideTableColumns}
      rows={[]}
      getRowId={(row) => row.id}
      checkboxSelection={false}
    />
  );
};
