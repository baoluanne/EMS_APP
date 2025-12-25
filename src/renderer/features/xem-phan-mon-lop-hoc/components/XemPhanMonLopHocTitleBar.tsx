import { Stack, Typography } from '@mui/material';
import { DebouncedTextField } from '@renderer/components/fields';
import { ReactNode } from 'react';

interface XemPhanMonLopHocTitleBarProps {
  title?: ReactNode;
}

export const XemPhanMonLopHocTitleBar = ({ title }: XemPhanMonLopHocTitleBarProps) => {
  return (
    <Stack direction="column" mb={2}>
      <Stack direction="row" alignItems="center" mb={2}>
        <Typography fontWeight={700}>{title}</Typography>
      </Stack>
      <Stack direction="row" spacing={4}>
        <DebouncedTextField onChange={() => {}} label="Tổng số tín chỉ" />
      </Stack>
    </Stack>
  );
};
