import { Stack } from '@mui/material';
import { AppDatePicker, DebouncedTextField } from '@renderer/components/fields';
import { FC } from 'react';
import { QuanLyGianVienFilter } from '../types';

interface GiangVienFilterProps {
  filter: QuanLyGianVienFilter;
  setFilter: (newFilter: Partial<QuanLyGianVienFilter>) => void;
}

export const GiangVienFilter: FC<GiangVienFilterProps> = ({ setFilter }) => {
  return (
    <Stack direction="row" gap={2}>
      <DebouncedTextField
        label="Mã giảng viên"
        containerProps={{ flex: 1 }}
        onChange={(val) => setFilter({ maGiangVien: val })}
      />
      <DebouncedTextField
        label="Họ và tên"
        containerProps={{ flex: 1 }}
        onChange={(val) => setFilter({ hoVaTen: val })}
      />
      <AppDatePicker
        label="Ngày chấm dứt hợp đồng"
        containerProps={{
          sx: {
            flex: 1,
          },
        }}
        onChange={(value) =>
          setFilter({ ngayChamDutHopDong: value ? new Date(value?.getDate()) : undefined })
        }
      />
    </Stack>
  );
};
