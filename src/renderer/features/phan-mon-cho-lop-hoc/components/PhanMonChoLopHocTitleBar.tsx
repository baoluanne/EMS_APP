import { Stack, Typography } from '@mui/material';
import { DebouncedTextField } from '@renderer/components/fields';
import { ReactNode } from 'react';

interface PhanMonChoLopHocTitleBarProps {
  title?: ReactNode;
}

export const PhanMonChoLopHocTitleBar = ({ title }: PhanMonChoLopHocTitleBarProps) => {
  return (
    <Stack spacing={2.5}>
      <Stack direction="row" alignItems="center">
        <Typography fontWeight={700}>{title}</Typography>
      </Stack>
      <Stack direction="row" spacing={4}>
        <DebouncedTextField
          onChange={() => {}}
          label={
            <Typography fontSize={14} component="span" noWrap>
              Tổng số tín chỉ:
            </Typography>
          }
          containerProps={{
            direction: 'row',
            spacing: 2,
            alignItems: 'center',
          }}
        />
      </Stack>
    </Stack>
  );
};
