import { Stack } from '@mui/material';
import { FilterDrawerBottom } from '@renderer/components/modals';
import { useForm } from 'react-hook-form';
import { DanhMucKhungHoSoHssvFilterType } from '../types';
import {
  BacDaoTaoSelection,
  KhoaHocSelection,
  LoaiDaoTaoSelection,
  LoaiSinhVienSelection,
} from '@renderer/components/selections';
import { ControlledTextField } from '@renderer/components/controlled-fields';

type Props = {
  onApply: (filters: DanhMucKhungHoSoHssvFilterType) => void;
  onClear?: () => void;
};
const defaultValuesFilter = {
  idKhoaHoc: undefined,
  idBacDaoTao: undefined,
  idLoaiDaoTao: undefined,
  idLoaiSinhVien: undefined,
  keyword: undefined,
};
export const DanhMucKhungHoSoHssvFilterForm = ({ onApply, onClear }: Props) => {
  const filterMethods = useForm<DanhMucKhungHoSoHssvFilterType>({
    defaultValues: defaultValuesFilter,
  });
  const { control } = filterMethods;
  const handleClear = () => {
    filterMethods.reset(defaultValuesFilter);
    onClear?.();
  };
  return (
    <FilterDrawerBottom<DanhMucKhungHoSoHssvFilterType>
      onApply={onApply}
      onClear={handleClear}
      methods={filterMethods}
    >
      <Stack gap={2}>
        <Stack direction="row" gap={2}>
          <ControlledTextField control={control} name="keyword" label="Tìm kiếm" />
        </Stack>
        <Stack direction="row" gap={2}>
          <BacDaoTaoSelection control={control} name="idBacDaoTao" />
          <KhoaHocSelection control={control} name="idKhoaHoc" />
        </Stack>
        <Stack direction="row" gap={2}>
          <LoaiDaoTaoSelection control={control} name="idLoaiDaoTao" />
          <LoaiSinhVienSelection control={control} name="idLoaiSinhVien" />
        </Stack>
      </Stack>
    </FilterDrawerBottom>
  );
};
