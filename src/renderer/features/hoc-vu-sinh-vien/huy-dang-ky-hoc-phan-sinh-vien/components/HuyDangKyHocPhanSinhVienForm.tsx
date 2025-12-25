import { Grid, Stack, Typography } from '@mui/material';
import { ControlledRadioGroup, ControlledTextField } from '@renderer/components/controlled-fields';
import { useForm, useFormContext } from 'react-hook-form';
import { useDisclosure } from '@renderer/shared/hooks';
import { FilterDrawerBottom } from '@renderer/components/modals';
import { TimKiemSinhVienModal } from '@renderer/features/hoc-vu-sinh-vien/tim-kiem/sinh-vien';
import { SearchButton } from '@renderer/features/common';
import ImageBox from '@renderer/features/common/ImageBox';
import { SinhVien } from '@renderer/shared/types';
import {
  defaultHuyDangKyHocPhanSinhVienState,
  HuyDangKyHocPhanSinhVienState,
} from '@renderer/features/hoc-vu-sinh-vien/huy-dang-ky-hoc-phan-sinh-vien';

interface Props {
  onSubmit?: (sinhvien: SinhVien) => void;
}

export const HuyDangKyHocPhanSinhVienForm = (props: Props) => {
  const mainForm = useFormContext();
  const formMethods = useForm<HuyDangKyHocPhanSinhVienState>({
    defaultValues: defaultHuyDangKyHocPhanSinhVienState,
  });
  const { control, setValue, getValues } = formMethods;
  const { isOpen, toggle } = useDisclosure();
  const handleSelectSinhVien = (sinhvien: SinhVien) => {
    setValue('maSinhVien', sinhvien.maSinhVien);
    setValue('hoTen', sinhvien.fullName);
    setValue(
      'ngaySinh',
      sinhvien.ngaySinh ? new Date(sinhvien.ngaySinh).toLocaleDateString('vi-VN') : '',
    );
    setValue('gioiTinh', sinhvien.gioiTinh?.toString());
    setValue('coSo', sinhvien.coSoDaoTao?.tenCoSo);
    setValue('khoaHoc', sinhvien.khoaHoc?.tenKhoaHoc);
    setValue('bacDaoTao', sinhvien.bacDaoTao?.tenBacDaoTao);
    setValue('loaiDaoTao', sinhvien.loaiDaoTao?.tenLoaiDaoTao);
    setValue('nganh', sinhvien.nganh?.tenNganhHoc);
    setValue('chuyenNganh', sinhvien.chuyenNganh?.tenChuyenNganh);
    setValue('hinhTheSinhVienUrl', sinhvien.hinhTheSinhVienUrl);
    setValue('lopHocCu', sinhvien.lopHoc?.tenLop);
    mainForm.setValue('lopHocCu', sinhvien.lopHoc);
    props.onSubmit?.(sinhvien);
  };

  return (
    <FilterDrawerBottom<HuyDangKyHocPhanSinhVienState>
      onClear={() => void 0}
      title=""
      hideButtons={true}
      defaultExpanded={true}
    >
      <Grid container spacing={2}>
        <Grid size={10}>
          <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1 }}>
            Thông tin sinh viên
          </Typography>
          <Grid container spacing={1}>
            <Grid size={6}>
              <Grid container>
                <ControlledTextField
                  control={control}
                  name="maSinhVien"
                  label="Mã sinh viên"
                  required
                  readOnly={true}
                  onClick={toggle}
                />
                <SearchButton onClick={toggle} />
                {isOpen && (
                  <TimKiemSinhVienModal onClose={toggle} onSelect={handleSelectSinhVien} />
                )}
              </Grid>
            </Grid>
            <Grid size={3}>
              <ControlledTextField label="Ngày sinh" control={control} name="ngaySinh" />
            </Grid>
            <Grid size={3}>
              <Stack direction="row" gap={2} alignItems="center">
                <Typography fontSize={12}>Giới tính</Typography>
                <ControlledRadioGroup
                  options={['Nam', 'Nữ'].map((value, index) => ({
                    label: value,
                    value: index.toString(),
                    disabled: true,
                  }))}
                  control={control}
                  name="gioiTinh"
                />
              </Stack>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid size={6}>
              <ControlledTextField control={control} name="hoTen" label="Họ tên" />
            </Grid>
            <Grid size={6}>
              <ControlledTextField control={control} readOnly name="lopHocCu" label="Lớp học" />
            </Grid>
            <Grid size={6}>
              <ControlledTextField control={control} readOnly name="coSo" label="Cơ sở" />
            </Grid>
            <Grid size={6}>
              <ControlledTextField control={control} readOnly name="khoaHoc" label="Khóa học" />
            </Grid>
            <Grid size={6}>
              <ControlledTextField
                control={control}
                readOnly
                name="bacDaoTao"
                label="Bậc đào tạo"
              />
            </Grid>
            <Grid size={6}>
              <ControlledTextField
                control={control}
                readOnly
                name="loaiDaoTao"
                label="Loại đào tạo"
              />
            </Grid>
            <Grid size={6}>
              <ControlledTextField control={control} readOnly name="nganh" label="Ngành" />
            </Grid>
            <Grid size={6}>
              <ControlledTextField
                control={control}
                readOnly
                name="chuyenNganh"
                label="Chuyên ngành"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid size={2}>
          <ImageBox
            alt="Ảnh sinh viên"
            src={getValues('hinhTheSinhVienUrl') || undefined}
            placeholder="Ảnh"
            height={220}
          />
        </Grid>
        <Grid size={10}>
          <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1 }}>
            Thông tin sinh viên
          </Typography>
          <Grid container spacing={1}>
            <Grid size={6}>
              <ControlledTextField
                control={control}
                readOnly
                name="dotDangKy"
                label="Đợt đăng ký"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </FilterDrawerBottom>
  );
};
