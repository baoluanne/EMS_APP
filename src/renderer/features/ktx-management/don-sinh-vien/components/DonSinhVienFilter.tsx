import { Grid } from '@mui/material';
import { FilterDrawerBottom } from '@renderer/components/modals';
import { useForm } from 'react-hook-form';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { ControlledSelect } from '@renderer/components/controlled-fields/ControlledSelect';

export interface DonSinhVienFilterState {
  maSinhVien?: string;
  hoTen?: string;
  trangThai?: string;
  loaiDon?: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export const donSinhVienDefaultFilters: DonSinhVienFilterState = {
  maSinhVien: undefined,
  hoTen: undefined,
  trangThai: undefined,
  loaiDon: undefined,
};

const trangThaiOptions = [
  { value: 'ChoPhuyet', label: 'Chờ duyệt' }, // Khớp với TrangThaiDonConstants.CHO_PHE_DUYET
  { value: 'DaDuyet', label: 'Đã duyệt' },
  { value: 'TuChoi', label: 'Từ chối' },
  { value: 'DaHuy', label: 'Đã hủy' },
];

const loaiDonOptions = [
  { value: 'VaoO', label: 'Vào ở' },
  { value: 'ChuyenPhong', label: 'Chuyển phòng' },
  { value: 'GiaHanKtx', label: 'Gia hạn' },
  { value: 'RoiKtx', label: 'Rời KTX' },
];

interface Props {
  onApply: (filters: DonSinhVienFilterState) => void;
  onReset: () => void;
}

export const DonSinhVienFilter = ({ onApply, onReset }: Props) => {
  const filterMethods = useForm<DonSinhVienFilterState>({
    defaultValues: donSinhVienDefaultFilters,
  });

  const { control } = filterMethods;

  const handleClear = () => {
    filterMethods.reset(donSinhVienDefaultFilters);
    onReset();
  };

  const handleApply = (data: DonSinhVienFilterState) => {
    const cleanedData: DonSinhVienFilterState = {
      maSinhVien: data.maSinhVien?.trim() || undefined,
      hoTen: data.hoTen?.trim() || undefined,
      trangThai: data.trangThai || undefined,
      loaiDon: data.loaiDon || undefined,
    };

    onApply(cleanedData);
  };

  return (
    <FilterDrawerBottom<DonSinhVienFilterState>
      onApply={handleApply}
      onClear={handleClear}
      methods={filterMethods}
    >
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <ControlledTextField
            control={control}
            name="maSinhVien"
            label="Mã sinh viên"
            placeholder="Tìm theo mã..."
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <ControlledTextField
            control={control}
            name="hoTen"
            label="Họ tên"
            placeholder="Tìm theo tên..."
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <ControlledSelect
            control={control}
            name="loaiDon"
            label="Loại đơn"
            options={[{ value: '', label: '-- Tất cả --' }, ...loaiDonOptions]}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <ControlledSelect
            control={control}
            name="trangThai"
            label="Trạng thái"
            options={[{ value: '', label: '-- Tất cả --' }, ...trangThaiOptions]}
          />
        </Grid>
      </Grid>
    </FilterDrawerBottom>
  );
};
