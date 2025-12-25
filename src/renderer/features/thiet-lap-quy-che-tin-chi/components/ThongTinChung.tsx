import { Stack } from '@mui/material';
import { DataGridTable } from '@renderer/components/Table';
import { thongTinChungColumns } from '../configs/table.config';
import { DieuKienDuThiKetThucMonForm, DinhDangDiemSoForm, QuyDinhCachTinhDiemForm } from './forms';

export const ThongTinChung = () => {
  return (
    <Stack gap={2.5}>
      <DataGridTable
        columns={thongTinChungColumns}
        rows={[]}
        getRowId={(row) => row.id}
        checkboxSelection={false}
      />
      <QuyDinhCachTinhDiemForm />
      <DinhDangDiemSoForm />
      <DieuKienDuThiKetThucMonForm />
    </Stack>
  );
};
