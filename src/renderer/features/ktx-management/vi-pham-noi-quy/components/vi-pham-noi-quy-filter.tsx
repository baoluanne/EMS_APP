import { Grid } from '@mui/material';
import { FilterDrawerBottom } from '@renderer/components/modals';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { useForm } from 'react-hook-form';
import { ViPhamNoiQuyFilterState, viPhamNoiQuyDefaultFilters } from '../validation';
import { SinhVienCuTruSelection } from '@renderer/components/selections/SinhVienCuTruSelection';

interface Props {
  onApply: (filters: ViPhamNoiQuyFilterState) => void;
  onReset: () => void;
}

export const ViPhamNoiQuyFilter = ({ onApply, onReset }: Props) => {
  const filterMethods = useForm<ViPhamNoiQuyFilterState>({
    defaultValues: viPhamNoiQuyDefaultFilters,
  });

  const { control, reset, getValues } = filterMethods;

  const handleApply = () => {
    const values = getValues();

    const rawSV = values.maSinhVien as any;
    let searchString = '';

    if (typeof rawSV === 'object' && rawSV !== null) {
      searchString = rawSV.maSinhVien;
    } else {
      searchString = rawSV;
    }

    onApply({
      ...values,
      maSinhVien: searchString,
      keyword: searchString,
    });
  };

  return (
    <FilterDrawerBottom<ViPhamNoiQuyFilterState>
      onApply={handleApply}
      onClear={() => {
        reset(viPhamNoiQuyDefaultFilters);
        onReset();
      }}
      methods={filterMethods}
    >
      <Grid container spacing={2}>
        <Grid size={12}>
          <SinhVienCuTruSelection
            control={control}
            name="maSinhVien"
            label="Mã số hoặc Họ tên sinh viên"
            isFilter
          />
        </Grid>
        <Grid size={4}>
          <ControlledTextField
            control={control}
            name="maPhong"
            label="Mã phòng"
            placeholder="Ví dụ: R10-101"
          />
        </Grid>
        <Grid size={4}>
          <ControlledTextField
            control={control}
            name="viPhamTu"
            label="Điểm vi phạm từ"
            type="number"
            placeholder="Nhập số điểm..."
          />
        </Grid>
        <Grid size={4}>
          <ControlledTextField
            control={control}
            name="soDienThoai"
            label="Số điện thoại"
            placeholder="Nhập SĐT..."
          />
        </Grid>
      </Grid>
    </FilterDrawerBottom>
  );
};
