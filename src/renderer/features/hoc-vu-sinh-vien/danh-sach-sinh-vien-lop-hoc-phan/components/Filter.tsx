import { Grid, Stack, Typography } from '@mui/material';
import { FilterDrawerBottom } from '@renderer/components/modals';
import { useFormContext, UseFormReturn } from 'react-hook-form';
import {
  defaultSinhVienLopHocPhanFilterState,
  hocPhiOptions,
  SinhVienLopHocPhanFilterType,
} from '@renderer/features/hoc-vu-sinh-vien/danh-sach-sinh-vien-lop-hoc-phan';
import {
  HocKySelection,
  TrangThaiDangKySelection,
  TrangThaiSinhVienSelection,
} from '@renderer/components/selections';
import { ControlledRadioGroup, ControlledTextField } from '@renderer/components/controlled-fields';
import { useDisclosure } from '@renderer/shared/hooks';
import { FilterSelect } from '@renderer/components/fields';
import { LopHocPhanRecord, TimKiemLopHocPhanModal } from '../../tim-kiem/lop-hoc-phan';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { SearchButton } from '@renderer/features/common';

interface Props {
  onApply: (filters: SinhVienLopHocPhanFilterType) => void;
  methods: UseFormReturn<SinhVienLopHocPhanFilterType>;
  setTenGiangVienLHP?: (tenGiangVien: string) => void;
}

export const DanhSachSinhVienLopHocPhanFilter = ({
  onApply,
  methods,
  setTenGiangVienLHP,
}: Props) => {
  const { control, getValues, setValue } = useFormContext();
  const [idHocKy, SetIdHocKy] = useState<string>('');
  const { isOpen, toggle } = useDisclosure();

  const handleClear = () => {
    methods.reset(defaultSinhVienLopHocPhanFilterState);
    setTenGiangVienLHP?.('');
  };

  const openSearchLHP = () => {
    const hocKy = getValues('idHocKy');
    if (hocKy) {
      SetIdHocKy(hocKy);
      toggle();
    } else {
      toast.error('Vui lòng chọn học kỳ trước khi tìm kiếm lớp học phần');
    }
  };
  const handleLHPSelected = (lhp: LopHocPhanRecord) => {
    setValue('maLHP', lhp.maLopHocPhan);
    setValue('tenLHP', lhp.tenLopHocPhan);
    setValue('nhom', lhp.nhom);
    setTenGiangVienLHP?.(
      lhp.giangVien.hoDem + ' ' + lhp.giangVien.ten + ' (' + lhp.giangVien.maGiangVien + ')',
    );
  };
  return (
    <FilterDrawerBottom<SinhVienLopHocPhanFilterType>
      onApply={onApply}
      onClear={handleClear}
      methods={methods}
    >
      <Grid container rowSpacing={1} columnSpacing={4}>
        <Grid container spacing={1} size={12}>
          <Grid size={3}>
            <HocKySelection control={control} name="idHocKy" label="Đợt" required />
          </Grid>
          <Grid size={3}>
            <Grid container>
              <ControlledTextField
                control={control}
                name="maLHP"
                label="Mã LHP"
                required
                disabled
              />
              <SearchButton onClick={openSearchLHP} />
              {isOpen && (
                <TimKiemLopHocPhanModal
                  defaultIdHocKy={idHocKy}
                  onClose={toggle}
                  onSelect={handleLHPSelected}
                />
              )}
            </Grid>
          </Grid>
          <Grid size={3}>
            <ControlledTextField control={control} name="tenLHP" label="Tên LHP" disabled />
          </Grid>
          <Grid size={3}>
            <Stack flex={1}>
              <FilterSelect
                label="Nhóm"
                options={['1', '2', '3', '4', '5', '6', '7'].map((value) => ({
                  label: value,
                  value,
                }))}
                name="nhom"
                control={control}
              />
            </Stack>
          </Grid>
        </Grid>
        <Grid container spacing={1} size={12}>
          <Grid size={3}>
            <TrangThaiSinhVienSelection
              control={control}
              name="trangThaiSinhVien"
              label="Trạng thái SV"
            />
          </Grid>
          <Grid size={3}>
            <TrangThaiDangKySelection control={control} name="trangThaiDangKyLHP" />
          </Grid>
          <Grid size={6}>
            <Stack direction="row" gap={2} alignItems="center">
              <Typography fontSize={12}>Học phí</Typography>
              <ControlledRadioGroup options={hocPhiOptions} control={control} name="hocPhiFilter" />
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </FilterDrawerBottom>
  );
};
