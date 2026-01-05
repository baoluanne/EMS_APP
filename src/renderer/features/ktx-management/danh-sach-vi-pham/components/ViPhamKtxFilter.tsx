import { Grid } from '@mui/material';
import { FilterDrawerBottom } from '@renderer/components/modals';
import { useForm } from 'react-hook-form';
import { ViPhamFilterState, viPhamDefaultFilters } from '../validation';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { ControlledSelect } from '@renderer/components/controlled-fields/ControlledSelect';

interface Props {
  onApply: (filters: ViPhamFilterState) => void;
  onReset: () => void;
}

export const ViPhamKtxFilter = ({ onApply, onReset }: Props) => {
  const filterMethods = useForm<ViPhamFilterState>({
    defaultValues: viPhamDefaultFilters,
  });

  const { control, reset } = filterMethods;

  const handleClear = () => {
    reset(viPhamDefaultFilters);
    onApply(viPhamDefaultFilters);
    onReset();
  };

  const handleLocalApply = (data: ViPhamFilterState) => {
    onApply({
      searchTerm: data.searchTerm?.trim() || undefined,
      maPhong: data.maPhong?.trim() || undefined,
      tuNgay: data.tuNgay || undefined,
      noiDungViPham: data.noiDungViPham || undefined,
    });
  };
  const danhSachLoiViPham = [
    { value: 'Nấu ăn trong phòng', label: 'Nấu ăn trong phòng' },
    { value: 'Sử dụng thiết bị điện công suất lớn', label: 'Sử dụng thiết bị điện công suất lớn' },
    { value: 'Gây mất trật tự sau 23h', label: 'Gây mất trật tự sau 23h' },
    { value: 'Không vệ sinh phòng ở sạch sẽ', label: 'Không vệ sinh phòng ở sạch sẽ' },
    { value: 'Cho người ngoài vào ở trái phép', label: 'Cho người ngoài ở trái phép' },
    { value: 'Vi phạm giờ giấc (về muộn)', label: 'Vi phạm giờ giấc (về muộn)' },
  ];

  return (
    <FilterDrawerBottom<ViPhamFilterState>
      onApply={handleLocalApply}
      onClear={handleClear}
      methods={filterMethods}
    >
      <Grid container spacing={2}>
        <Grid size={3}>
          <ControlledTextField control={control} name="searchTerm" label="Mã SV / Họ tên" />
        </Grid>
        <Grid size={3}>
          <ControlledSelect
            control={control}
            name="noiDungViPham"
            label="Lỗi vi phạm"
            options={danhSachLoiViPham}
          />
        </Grid>
        <Grid size={3}>
          <ControlledTextField
            control={control}
            name="tuNgay"
            label="Từ ngày"
            type="date"
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Grid>
      </Grid>
    </FilterDrawerBottom>
  );
};
