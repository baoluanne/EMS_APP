import { Stack, Typography } from '@mui/material';
import { DataGridTable } from '@renderer/components/Table';
import { dsHocPhanDaDangKyTableColumns } from '@renderer/features/hoc-vu-sinh-vien/quan-ly-dang-ky-hoc-phan/dang-ky-hoc-phan-tu-do';
import { SinhVien } from '@renderer/shared/types/sinh-vien.types';

interface Props {
  tableTitle: string;
  transferSVs: SinhVien[];
}

export const DsHocPhanDaDangKyTable = ({ tableTitle, transferSVs }: Props) => {
  return (
    <Stack
      className="w-full h-full gap-y-2"
      style={{
        height: '100%',
        width: '100%',
        overflow: 'auto',
        position: 'relative',
        borderRadius: '0px',
      }}
    >
      <Typography>{tableTitle}</Typography>
      <DataGridTable
        columns={dsHocPhanDaDangKyTableColumns}
        rows={transferSVs}
        checkboxSelection
        height={'calc(100% - 85px)'}
      />
    </Stack>
  );
};
