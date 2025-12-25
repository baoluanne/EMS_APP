import { Stack } from '@mui/material';
import { DataGridTable } from '@renderer/components/Table';
import React from 'react';
import { thongTinChungColumns } from '../configs';
import { DieuKienDuThiKetThucMonForm, DinhDangDiemSoForm, QuyDinhCachTinhDiemForm } from './forms';

export const ThongTinChung: React.FC = () => {
  return (
    <Stack gap={2.5}>
      <DataGridTable columns={thongTinChungColumns} rows={[]} checkboxSelection />
      <QuyDinhCachTinhDiemForm />
      <DinhDangDiemSoForm />
      <DieuKienDuThiKetThucMonForm />
    </Stack>
  );
};
