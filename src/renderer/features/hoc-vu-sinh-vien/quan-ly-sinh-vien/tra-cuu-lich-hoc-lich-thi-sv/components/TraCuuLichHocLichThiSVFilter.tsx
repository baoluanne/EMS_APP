import { Grid, Stack } from '@mui/material';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { ControlledSelect } from '@renderer/components/controlled-fields/ControlledSelect';
import { FilterDrawerBottom } from '@renderer/components/modals';
import { HocKySelection } from '@renderer/components/selections';
import { SearchButton } from '@renderer/features/common/SearchButton';
import { TimKiemSinhVienModal } from '@renderer/features/hoc-vu-sinh-vien/tim-kiem/sinh-vien';
import { useDisclosure } from '@renderer/shared/hooks';
import { SinhVien } from '@renderer/shared/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  TraCuuLichHocLichThiSVFilterFormSchema,
  TraCuuLichHocLichThiSVFilterForm,
} from '../validations';

const defaultValues: TraCuuLichHocLichThiSVFilterForm = {
  idDot: '',
  maSinhVien: '',
  hoDem: '',
  ten: '',
  loaiLich: '',
  trangThai: '',
};

interface Props {
  onApply: (filters: TraCuuLichHocLichThiSVFilterForm) => void;
}

export const TraCuuLichHocLichThiSVFilter = ({ onApply }: Props) => {
  const filterMethods = useForm<TraCuuLichHocLichThiSVFilterForm>({
    defaultValues,
    resolver: zodResolver(TraCuuLichHocLichThiSVFilterFormSchema),
  });
  const { control } = filterMethods;
  const { isOpen, toggle } = useDisclosure();

  const handleClear = () => {
    filterMethods.reset(defaultValues);
  };

  const onSelectSV = (sinhVien: SinhVien) => {
    filterMethods.setValue('maSinhVien', sinhVien.maSinhVien || '');
    filterMethods.setValue('hoDem', sinhVien.hoDem || '');
    filterMethods.setValue('ten', sinhVien.ten || '');
  };

  return (
    <FilterDrawerBottom onApply={onApply} onClear={handleClear} methods={filterMethods}>
      <Grid container rowSpacing={1} columnSpacing={4}>
        <Grid size={6}>
          <HocKySelection control={control} name="idDot" label="Đợt" required />
        </Grid>
        <Grid size={6}>
          <Stack direction="row" gap={1}>
            <ControlledTextField
              control={control}
              name="maSinhVien"
              label="Mã sinh viên"
              required
              disabled
            />
            <SearchButton onClick={toggle} />
            {isOpen && <TimKiemSinhVienModal onClose={toggle} onSelect={onSelectSV} />}
            <ControlledTextField control={control} name="hoDem" label="Họ đệm" disabled />
            <ControlledTextField control={control} name="ten" label="Tên" disabled />
          </Stack>
        </Grid>
        <Grid size={6}>
          <ControlledSelect
            name="loaiLich"
            control={control}
            label="Loại lịch"
            options={[
              { label: 'Tất cả', value: '' },
              { label: 'Lịch học', value: 'LichHoc' },
              { label: 'Lịch thi', value: 'LichThi' },
            ]}
          />
        </Grid>
        <Grid size={6}>
          <ControlledSelect
            name="trangThai"
            control={control}
            label="Trạng thái"
            options={[
              { label: 'Tất cả', value: '' },
              { label: 'Đang lên kết hoạch', value: 'DangLenKeHoach' },
              { label: 'Mở lớp', value: 'MoLop' },
              { label: 'Chỉ đăng ký', value: 'ChiDangKy' },
              { label: 'Đã khóa', value: 'DaKhoa' },
              { label: 'Hủy lớp', value: 'HuyLop' },
            ]}
          />
        </Grid>
      </Grid>
    </FilterDrawerBottom>
  );
};
