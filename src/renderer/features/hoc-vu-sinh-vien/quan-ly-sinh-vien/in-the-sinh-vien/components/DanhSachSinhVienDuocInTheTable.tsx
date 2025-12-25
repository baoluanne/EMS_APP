import { Stack, Typography } from '@mui/material';
import { DataGridTable } from '@renderer/components/Table';
import { columns } from '@renderer/features/hoc-vu-sinh-vien/quan-ly-sinh-vien/in-the-sinh-vien';
import { SinhVien } from '@renderer/shared/types/sinh-vien.types';

interface Props {
  tableTitle: string;
  transferSVs: SinhVien[];
}

export const DanhSachSinhVienDuocInTheTable = ({ tableTitle, transferSVs }: Props) => {
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
        columns={columns}
        rows={transferSVs}
        checkboxSelection
        height={'calc(100% - 85px)'}
      />
    </Stack>
  );
};
