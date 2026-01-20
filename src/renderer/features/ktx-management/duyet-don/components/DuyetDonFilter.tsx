import { Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { FilterDrawerBottom } from '@renderer/components/modals';
import { FilterSelect } from '@renderer/components/fields';
import { ControlledDatePicker, ControlledTextField } from '@renderer/components/controlled-fields';
import { KtxLoaiDonOptions, KtxDonTrangThaiOptions } from '../configs/KtxDonEnum';
import { DuyetDonFilterState } from '../validation';

interface Props {
  onApply: (filters: DuyetDonFilterState) => void;
  onReset: () => void;
}
// eslint-disable-next-line react-refresh/only-export-components
export const KtxGioiTinhOptions = [
  { label: 'Nam', value: 0 },
  { label: 'Nữ', value: 1 },
];
export const DuyetDonFilter = ({ onApply, onReset }: Props) => {
  const filterMethods = useForm<DuyetDonFilterState>({
    defaultValues: {
      loaiDon: undefined,
      trangThai: undefined,
      gioiTinh: undefined,
      ngaySinh: undefined,
      maDon: undefined,
    },
  });

  const { control, reset } = filterMethods;

  return (
    <FilterDrawerBottom
      onApply={onApply}
      onClear={() => {
        reset();
        onReset();
      }}
      methods={filterMethods}
    >
      <Grid container spacing={2}>
        <Grid size={6}>
          <ControlledTextField
            name="idSinhVien"
            control={control}
            label="Mã sinh viên"
            placeholder="Tìm kiếm theo mã sinh viên"
          />
        </Grid>
        <Grid size={6}>
          <FilterSelect
            name="gioiTinh"
            control={control}
            label="Giới tính"
            options={KtxGioiTinhOptions}
          />
        </Grid>

        <Grid size={6}>
          <ControlledDatePicker name="ngaySinh" control={control} label="Ngày sinh sinh viên" />
        </Grid>

        <Grid size={6}>
          <ControlledTextField
            name="maDon"
            control={control}
            label="Mã đơn"
            placeholder="Tìm kiếm theo mã đơn"
          />
        </Grid>
        <Grid size={6}>
          <FilterSelect
            name="loaiDon"
            control={control}
            label="Loại đơn"
            options={KtxLoaiDonOptions}
          />
        </Grid>
        <Grid size={6}>
          <FilterSelect
            name="trangThai"
            control={control}
            label="Trạng thái"
            options={KtxDonTrangThaiOptions}
          />
        </Grid>
      </Grid>
    </FilterDrawerBottom>
  );
};
