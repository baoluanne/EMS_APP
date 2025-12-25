import { Stack } from '@mui/material';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import ControlledDatePicker from '@renderer/components/controlled-fields/ControlledDatePicker';
import { FilterDrawerBottom } from '@renderer/components/modals';
import { useForm } from 'react-hook-form';
import { QuanLyGianVienFilter } from '../types';

type Props = {
  onApply: (filters: QuanLyGianVienFilter) => void;
};

export const GiangVienFilters = ({ onApply }: Props) => {
  const filterMethods = useForm<QuanLyGianVienFilter>({
    defaultValues: {
      maGiangVien: '',
      hoVaTen: '',
    },
  });
  const { control } = filterMethods;

  const handleClear = () => {
    filterMethods.reset({
      maGiangVien: '',
      hoVaTen: '',
    });
  };

  return (
    <FilterDrawerBottom<QuanLyGianVienFilter>
      onApply={onApply}
      onClear={handleClear}
      methods={filterMethods}
    >
      <Stack direction="row" gap={2} mb={2}>
        <ControlledTextField control={control} name="maGiangVien" label="Mã giảng viên" />
        <ControlledTextField control={control} name="hoVaTen" label="Họ và tên" />
      </Stack>
      <ControlledDatePicker
        control={control}
        labelWidth={170}
        label="Ngày chấm dứt hợp đồng"
        name="ngayChamDutHopDong"
      />
    </FilterDrawerBottom>
  );
};

