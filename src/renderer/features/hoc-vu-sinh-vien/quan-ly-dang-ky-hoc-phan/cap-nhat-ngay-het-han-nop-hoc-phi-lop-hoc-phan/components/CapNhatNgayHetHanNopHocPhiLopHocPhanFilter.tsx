import { Grid, Stack, Typography } from '@mui/material';
import { ControlledRadioGroup, ControlledTextField } from '@renderer/components/controlled-fields';
import ControlledDateRangePicker from '@renderer/components/controlled-fields/ControlledDateRangePicker';
import { FilterDrawerBottom } from '@renderer/components/modals';
import {
  BacDaoTaoSelection,
  ChuyenNganhSelection,
  CoSoSelection,
  HocKySelection,
  KhoaHocSelection,
  KhoaSelection,
  LoaiDaoTaoSelection,
  LoaiLopLHPSelection,
  LopHocSelection,
  NganhSelection,
  TrangThaiLopHocPhanSelection,
} from '@renderer/components/selections';
import { useForm } from 'react-hook-form';
import { CapNhatNgayHetHanNopHocPhiLopHocPhanFilters } from '../types';

interface Props {
  onApply: (filters: CapNhatNgayHetHanNopHocPhiLopHocPhanFilters) => void;
}

export const CapNhatNgayHetHanNopHocPhiLopHocPhanFilter = ({ onApply }: Props) => {
  const filterMethods = useForm<CapNhatNgayHetHanNopHocPhiLopHocPhanFilters>({
    defaultValues: {
      idDot: '',
      idCoSo: '',
      idKhoaChuQuan: '',
      idKhoaChuQuanLop: '',
      idKhoaHoc: '',
      idBacDaoTao: '',
      idLoaiDaoTao: '',
      idNganh: '',
      idChuyenNganh: '',
      idTrangThaiLHP: '',
      idLoaiLop: '',
      lopHoc: '',
      monHocLopHocPhan: '',
      ngayHetHanHP1Tu: '',
      ngayHetHanHP1Den: '',
      trangThaiHP1: 'all',
      ngayHetHanHP2Tu: '',
      ngayHetHanHP2Den: '',
      trangThaiHP2: 'all',
    },
  });
  const { control } = filterMethods;
  const handleClear = () => {
    filterMethods.reset({
      idDot: '',
      idCoSo: '',
      idKhoaChuQuan: '',
      idKhoaChuQuanLop: '',
      idKhoaHoc: '',
      idBacDaoTao: '',
      idLoaiDaoTao: '',
      idNganh: '',
      idChuyenNganh: '',
      idTrangThaiLHP: '',
      idLoaiLop: '',
      lopHoc: '',
      monHocLopHocPhan: '',
      ngayHetHanHP1Tu: '',
      ngayHetHanHP1Den: '',
      trangThaiHP1: 'all',
      ngayHetHanHP2Tu: '',
      ngayHetHanHP2Den: '',
      trangThaiHP2: 'all',
    });
  };
  return (
    <FilterDrawerBottom onApply={onApply} onClear={handleClear} methods={filterMethods}>
      <Grid container rowSpacing={2} columnSpacing={4}>
        <Grid size={3}>
          <HocKySelection control={control} name="idDot" label="Đợt" required />
        </Grid>
        <Grid size={3}>
          <CoSoSelection control={control} name="idCoSo" />
        </Grid>
        <Grid size={3}>
          <KhoaSelection control={control} name="idKhoaChuQuan" label="Khoa chủ quản" />
        </Grid>
        <Grid size={3}>
          <KhoaSelection control={control} name="idKhoaChuQuanLop" label="Khoa CQ LBĐ" />
        </Grid>
        <Grid size={3}>
          <KhoaHocSelection control={control} name="idKhoaHoc" />
        </Grid>
        <Grid size={3}>
          <BacDaoTaoSelection control={control} name="idBacDaoTao" />
        </Grid>
        <Grid size={3}>
          <LoaiDaoTaoSelection control={control} name="idLoaiDaoTao" />
        </Grid>
        <Grid size={3}>
          <NganhSelection control={control} name="idNganh" />
        </Grid>
        <Grid size={3}>
          <ChuyenNganhSelection control={control} name="idChuyenNganh" />
        </Grid>
        <Grid size={3}>
          <TrangThaiLopHocPhanSelection
            control={control}
            name="idTrangThaiLHP"
            label="Trạng thái LHP"
          />
        </Grid>
        <Grid size={3}>
          <LoaiLopLHPSelection control={control} name="idLoaiLop" label="Loại lớp" />
        </Grid>
        <Grid size={3}>
          <LopHocSelection control={control} name="lopHoc" label="Lớp học" />
        </Grid>
        {/* HP 1 Section */}
        <Grid size={6}>
          <Stack spacing={1}>
            <Typography variant="body2" fontWeight="bold" sx={{ color: 'primary.main' }}>
              Ngày hết hạn nộp học phí lần 1
            </Typography>
            <ControlledDateRangePicker
              control={control}
              startName="ngayHetHanHP1Tu"
              endName="ngayHetHanHP1Den"
              startLabel="Từ ngày"
              endLabel="Đến ngày"
            />
            <ControlledRadioGroup
              control={control}
              name="trangThaiHP1"
              options={[
                { label: 'Tất cả', value: 'all' },
                { label: 'Đã hết hạn', value: 'expired' },
                { label: 'Chưa hết hạn', value: 'notExpired' },
              ]}
            />
          </Stack>
        </Grid>
        {/* HP 2 Section */}
        <Grid size={6}>
          <Stack spacing={1}>
            <Typography variant="body2" fontWeight="bold" sx={{ color: 'primary.main' }}>
              Ngày hết hạn nộp học phí lần 2
            </Typography>
            <ControlledDateRangePicker
              control={control}
              startName="ngayHetHanHP2Tu"
              endName="ngayHetHanHP2Den"
              startLabel="Từ ngày"
              endLabel="Đến ngày"
            />
            <ControlledRadioGroup
              control={control}
              name="trangThaiHP2"
              options={[
                { label: 'Tất cả', value: 'all' },
                { label: 'Đã hết hạn', value: 'expired' },
                { label: 'Chưa hết hạn', value: 'notExpired' },
              ]}
            />
          </Stack>
        </Grid>
        <Grid size={3}>
          <ControlledTextField control={control} name="monHocLopHocPhan" label="Môn học/LHP" />
        </Grid>
      </Grid>
    </FilterDrawerBottom>
  );
};
