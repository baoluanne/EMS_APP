import { Grid, Stack } from '@mui/material';
import { SearchButton } from '@renderer/features/common';
import ImageBox from '@renderer/features/common/ImageBox';
import { TimKiemSinhVienModal } from '@renderer/features/hoc-vu-sinh-vien/tim-kiem/sinh-vien';
import { ControlledTextField } from './controlled-fields';
import InfoSection from './InfoSection';
import {
  BacDaoTaoSelection,
  ChuyenNganhSelection,
  GioiTinhSelection,
  KhoaHocSelection,
  LoaiDaoTaoSelection,
  NganhSelection,
} from './selections';
import { useDisclosure } from '@renderer/shared/hooks';
import { SinhVien } from '@renderer/shared/types';
import { Control, FieldValues, UseFormReset } from 'react-hook-form';
import { useState } from 'react';

interface ThongTinSinhVienProps {
  reset: UseFormReset<FieldValues>;
  control: Control<FieldValues, any, FieldValues>;
  handleSinhVienSelected?: () => void;
  title?: string;
}

export const ThongTinSinhVien = ({
  reset,
  control,
  handleSinhVienSelected,
  title,
}: ThongTinSinhVienProps) => {
  const { toggle, isOpen } = useDisclosure();
  const [anhSinhVienUrl, setAnhSinhVien] = useState<string>('');

  const handleSVSelected = (sinhVien: SinhVien) => {
    reset({
      ...sinhVien,
      idSinhVien: sinhVien.id,
      idLopHoc1: sinhVien.lopHoc?.id,
      tenLop1: sinhVien.lopHoc?.tenLop,
      ngaySinh: sinhVien.ngaySinh ? new Date(sinhVien.ngaySinh).toLocaleDateString('vi-VN') : '',
      ghiChu: '',
      hoTen: sinhVien.fullName,
    });
    setAnhSinhVien(sinhVien.anhSinhVienUrl ?? sinhVien.hinhTheSinhVienUrl ?? '');
    handleSinhVienSelected?.();
  };

  return (
    <InfoSection title={title ?? 'Thông tin sinh viên'}>
      <Grid container spacing={1}>
        <Grid size={10}>
          <Stack spacing={1}>
            <Grid container spacing={1}>
              <Grid size={6}>
                <Grid container>
                  <ControlledTextField
                    control={control}
                    name="maSinhVien"
                    label="Mã sinh viên"
                    required
                  />
                  <SearchButton onClick={toggle} />
                  {isOpen && <TimKiemSinhVienModal onClose={toggle} onSelect={handleSVSelected} />}
                </Grid>
              </Grid>
              <Grid size={6}>
                <ControlledTextField label="Họ tên" control={control} name="hoTen" disabled />
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid size={6}>
                <ControlledTextField label="Ngày sinh" control={control} name="ngaySinh" disabled />
              </Grid>
              <Grid size={6}>
                <GioiTinhSelection control={control} name="gioiTinh" disabled />
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid size={6}>
                <ControlledTextField label="Lớp học" control={control} name="tenLop1" disabled />
              </Grid>
              <Grid size={6}>
                <KhoaHocSelection control={control} name="idKhoaHoc" disabled />
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid size={6}>
                <BacDaoTaoSelection control={control} name="idBacDaoTao" disabled />
              </Grid>
              <Grid size={6}>
                <LoaiDaoTaoSelection control={control} name="idLoaiDaoTao" disabled />
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid size={6}>
                <NganhSelection control={control} name="idNganh" disabled />
              </Grid>
              <Grid size={6}>
                <ChuyenNganhSelection control={control} name="idChuyenNganh" disabled />
              </Grid>
            </Grid>
          </Stack>
        </Grid>

        <Grid size={2}>
          <ImageBox src={anhSinhVienUrl} alt="Ảnh sinh viên" placeholder="Ảnh" height={180} />
        </Grid>
      </Grid>
    </InfoSection>
  );
};
