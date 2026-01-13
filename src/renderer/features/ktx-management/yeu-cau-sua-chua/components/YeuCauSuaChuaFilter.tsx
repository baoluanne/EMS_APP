import { Grid, MenuItem } from '@mui/material';
import { FilterDrawerBottom } from '@renderer/components/modals';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { PhongSelection } from '@renderer/components/selections/ktx/PhongSelection';
import { SinhVienDangOKtxSelection } from '@renderer/components/selections/ktx/SinhVienDangOKtxSelection';
import { useForm } from 'react-hook-form';
import { YeuCauSuaChuaFilterState, yeuCauSuaChuaDefaultFilters } from '../type';

interface Props {
  onApply: (filters: YeuCauSuaChuaFilterState) => void;
  onReset: () => void;
}

export const YeuCauSuaChuaFilter = ({ onApply, onReset }: Props) => {
  const filterMethods = useForm<YeuCauSuaChuaFilterState>({
    defaultValues: yeuCauSuaChuaDefaultFilters,
  });

  const { control } = filterMethods;

  const handleClear = () => {
    filterMethods.reset(yeuCauSuaChuaDefaultFilters);
    onReset();
  };

  const handleApply = (data: YeuCauSuaChuaFilterState) => {
    onApply({
      tieuDe: data.tieuDe?.trim() || undefined,
      trangThai: data.trangThai || undefined,
      phongKtxId: data.phongKtxId || undefined,
      sinhVienId: data.sinhVienId || undefined,
    });
  };

  return (
    <FilterDrawerBottom onApply={handleApply} onClear={handleClear} methods={filterMethods}>
      <Grid container spacing={2}>
        <Grid size={3}>
          <ControlledTextField
            control={control}
            name="tieuDe"
            label="Tiêu đề"
            placeholder="Nhập tiêu đề"
          />
        </Grid>
        <Grid size={3}>
          <PhongSelection control={control} name="phongKtxId" label="Phòng KTX" />
        </Grid>
        <Grid size={3}>
          <SinhVienDangOKtxSelection control={control} name="sinhVienId" label="Sinh viên" />
        </Grid>
        <Grid size={3}>
          <ControlledTextField control={control} name="trangThai" label="Trạng thái" select>
            <MenuItem value="">Tất cả</MenuItem>
            <MenuItem value="MoiGui">Mới gửi</MenuItem>
            <MenuItem value="DangXuLy">Đang xử lý</MenuItem>
            <MenuItem value="DaXong">Hoàn thành</MenuItem>
            <MenuItem value="Huy">Từ chối</MenuItem>
          </ControlledTextField>
        </Grid>
      </Grid>
    </FilterDrawerBottom>
  );
};
