import { Stack } from '@mui/material';
import { DataGridTable } from '@renderer/components/Table';
import { xetLenLopHocBongColumns } from '../configs/table.config';
import { HocBongSection } from './HocBongSection';
import { XetLenLopSection } from './XetLenLopSection';

export const XetLenLopHocBong = () => {
  return (
    <Stack gap={2.5}>
      <DataGridTable
        columns={xetLenLopHocBongColumns}
        rows={[]}
        getRowId={(row) => row.id}
        checkboxSelection={false}
      />
      <XetLenLopSection />
      <HocBongSection />
    </Stack>
  );
};
