import { Grid, Stack } from '@mui/material';
import { ControlledDatePicker, ControlledTextField } from '@renderer/components/controlled-fields';
import { useFormContext } from 'react-hook-form';
import {
  BacDaoTaoSelection,
  ChuyenNganhSelection,
  CoSoSelection,
  GioiTinhSelection,
  KhoaHocSelection,
  LoaiDaoTaoSelection,
  LopHocSelection,
  NganhSelection,
} from '@renderer/components/selections';
import { useDisclosure } from '@renderer/shared/hooks';
import { TimKiemSinhVienModal } from '@renderer/features/hoc-vu-sinh-vien/tim-kiem/sinh-vien';
import InfoSection from '@renderer/components/InfoSection';
import { SearchButton } from '@renderer/features/common';
import ImageBox from '@renderer/features/common/ImageBox';
import { SinhVien } from '@renderer/shared/types';
import { useState } from 'react';
import { DangKyNganh2FormData } from '../validations';

export default function DangKyHocNganh2Form() {
  const { control, reset } = useFormContext();
  const { isOpen, toggle } = useDisclosure();
  const [anhSinhVienUrl, SetAnhSinhVien] = useState<string>('');
  const [isDisabledNganh2, setIsDisabledNganh2] = useState<boolean>(true);

  const handleSVSelected = (sinhVien: SinhVien) => {
    console.log('handleSVSelected', sinhVien);
    reset({
      ...sinhVien,
      idSinhVien: sinhVien.id,
      idLopHoc1: sinhVien.lopHoc?.id,
      tenLop1: sinhVien.lopHoc?.tenLop,
      ngaySinh: sinhVien.ngaySinh ? new Date(sinhVien.ngaySinh).toLocaleDateString('vi-VN') : '',
      ghiChu: '',
      hoTen: sinhVien.fullName,
    } as DangKyNganh2FormData);
    SetAnhSinhVien(sinhVien.anhSinhVienUrl ?? sinhVien.hinhTheSinhVienUrl ?? '');
    setIsDisabledNganh2(false);
  };
  return (
    <Stack spacing={2}>
      <InfoSection title="Thông tin sinh viên">
        <Grid container spacing={2}>
          <Grid size={10}>
            <Stack spacing={2}>
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
                    {isOpen && (
                      <TimKiemSinhVienModal onClose={toggle} onSelect={handleSVSelected} />
                    )}
                  </Grid>
                </Grid>
                <Grid size={6}>
                  <ControlledTextField label="Họ tên" control={control} name="hoTen" disabled />
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid size={6}>
                  <ControlledTextField
                    label="Ngày sinh"
                    control={control}
                    name="ngaySinh"
                    disabled
                  />
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
      <InfoSection title="Thông tin ngành học 2">
        <Grid container spacing={2}>
          <Grid size={12}>
            <Stack spacing={2}>
              <Grid container spacing={1}>
                <Grid size={6}>
                  <CoSoSelection
                    control={control}
                    name="idCoSo"
                    required
                    disabled={isDisabledNganh2}
                  />
                </Grid>
                <Grid size={6}>
                  <KhoaHocSelection
                    control={control}
                    name="idKhoaHoc2"
                    disabled={isDisabledNganh2}
                    required
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid size={6}>
                  <NganhSelection
                    control={control}
                    name="idNganh2"
                    required
                    disabled={isDisabledNganh2}
                  />
                </Grid>
                <Grid size={6}>
                  <LopHocSelection
                    control={control}
                    name="idLopHoc2"
                    required
                    disabled={isDisabledNganh2}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid size={12}>
                  <ControlledTextField
                    control={control}
                    name="ghiChu"
                    label="Ghi chú"
                    disabled={isDisabledNganh2}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid size={6}>
                  <ControlledTextField
                    control={control}
                    name="soQuyetDinh"
                    label="Số quyết định"
                    disabled={isDisabledNganh2}
                  />
                </Grid>
                <Grid size={6}>
                  <ControlledDatePicker
                    control={control}
                    name="ngayQuyetDinh"
                    label="Ngày quyết định"
                    disabled={isDisabledNganh2}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid size={6}>
                  <ControlledTextField
                    control={control}
                    name="nguoiKy"
                    label="Người ký"
                    disabled={isDisabledNganh2}
                  />
                </Grid>
              </Grid>
            </Stack>
          </Grid>
        </Grid>
      </InfoSection>
    </Stack>
  );
}
