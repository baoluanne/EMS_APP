import { Grid, MenuItem } from '@mui/material';
import { FilterDrawerBottom } from '@renderer/components/modals';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { PhongSelection } from '@renderer/components/selections/ktx/PhongSelection';
import { SinhVienDangOKtxSelection } from '@renderer/components/selections/ktx/SinhVienDangOKtxSelection';
import { useForm } from 'react-hook-form';

export interface YeuCauSuaChuaFilterState {
  tieuDe?: string;
  trangThai?: string;
  phongKtxId?: string;
  sinhVienId?: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export const yeuCauSuaChuaDefaultFilters: YeuCauSuaChuaFilterState = {
  tieuDe: undefined,
  trangThai: undefined,
  phongKtxId: undefined,
  sinhVienId: undefined,
};

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
      trangThai: data.trangThai?.trim() || undefined,
      phongKtxId: data.phongKtxId?.trim() || undefined,
      sinhVienId: data.sinhVienId?.trim() || undefined,
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
            <MenuItem value="ChoXuLy">Chờ xử lý</MenuItem>
            <MenuItem value="DangXuLy">Đang xử lý</MenuItem>
            <MenuItem value="HoanThanh">Hoàn thành</MenuItem>
            <MenuItem value="TuChoi">Từ chối</MenuItem>
          </ControlledTextField>
        </Grid>
      </Grid>
    </FilterDrawerBottom>
  );
};
