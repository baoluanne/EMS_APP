import { Grid } from '@mui/material';
import { FilterDrawerBottom } from '@renderer/components/modals';
import { ControlledTextField, ControlledDatePicker } from '@renderer/components/controlled-fields';
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
    // Chuyển đổi điểm trừ sang kiểu number trước khi gửi lên API nếu người dùng nhập
    const cleanedValues = {
      ...values,
      //diemTru: values.diemTru ? Number(values.diemTru) : null,
    };
    onApply(cleanedValues);
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
            label="Lọc nhanh theo sinh viên đang cư trú"
            isFilter
          />
        </Grid>

        <Grid size={6}>
          <ControlledTextField
            control={control}
            name="maBienBan"
            label="Mã biên bản"
            placeholder="Nhập mã..."
          />
        </Grid>

        <Grid size={6}>
          <ControlledDatePicker control={control} name="tuNgay" label="Vi phạm từ ngày" />
        </Grid>

        {/* <Grid size={4}>
          <ControlledTextField
            control={control}
            name="diemTru"
            label="Điểm trừ"
            type="number" // Đảm bảo bàn phím số hiện lên trên mobile và có nút tăng giảm
            placeholder="Ví dụ: 10"
          />
        </Grid> */}
      </Grid>
    </FilterDrawerBottom>
  );
};
