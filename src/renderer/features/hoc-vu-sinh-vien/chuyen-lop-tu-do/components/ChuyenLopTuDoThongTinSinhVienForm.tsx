import { Grid, Stack, Typography } from '@mui/material';
import { ControlledRadioGroup, ControlledTextField } from '@renderer/components/controlled-fields';
import { useForm, useFormContext } from 'react-hook-form';
import {
  ChuyenLopTuDoThongTinSinhVienState,
  defaultChuyenLopTuDoThongTinSinhVienState,
} from '@renderer/features/hoc-vu-sinh-vien/chuyen-lop-tu-do/types';
import { LopHocSelection, PhanLoaiChuyenLopTuDoSelection } from '@renderer/components/selections';
import { useDisclosure } from '@renderer/shared/hooks';
import { FilterDrawerBottom } from '@renderer/components/modals';
import { TimKiemSinhVienModal } from '@renderer/features/hoc-vu-sinh-vien/tim-kiem/sinh-vien';
import { SearchButton } from '@renderer/features/common';
import ImageBox from '@renderer/features/common/ImageBox';
import { SinhVien } from '@renderer/shared/types';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { useGetQuery } from '@renderer/shared/queries';

interface Props {
  onSubmit?: (sinhvien: SinhVien) => void;
}

export interface ChuyenLopTuDoThongTinSinhVienFormHandle {
  refresh: () => void;
}

const ChuyenLopTuDoThongTinSinhVienForm = forwardRef<
  ChuyenLopTuDoThongTinSinhVienFormHandle,
  Props
>((props: Props, ref) => {
  const [sinhVien, setSinhVien] = useState<SinhVien>();
  const sinhVienQuery = useGetQuery<SinhVien>('SinhVien', sinhVien?.id || '', { enabled: false });
  const mainForm = useFormContext();
  const formMethods = useForm<ChuyenLopTuDoThongTinSinhVienState>({
    defaultValues: defaultChuyenLopTuDoThongTinSinhVienState,
  });
  const { control, setValue, getValues } = formMethods;
  const { isOpen, toggle } = useDisclosure();
  const handleSelectSinhVien = (sinhvien: SinhVien) => {
    console.log(sinhvien);
    setSinhVien(sinhvien);
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
  const handleSubmit = () => {
    if (sinhVien) {
      props.onSubmit?.(sinhVien);
    }
  };
  useImperativeHandle(ref, () => ({
    refresh: async () => {
      try {
        const { data } = await sinhVienQuery.refetch();
        handleSelectSinhVien(data!);
      } catch (error) {
        console.error(error);
      }
    },
  }));

  return (
    <FilterDrawerBottom<ChuyenLopTuDoThongTinSinhVienState>
      onClear={() => void 0}
      title="Thông tin sinh viên"
      onApply={handleSubmit}
      hideButtons={true}
    >
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
                    readOnly={true}
                    onClick={toggle}
                  />
                  <SearchButton onClick={toggle} />
                  {isOpen && (
                    <TimKiemSinhVienModal onClose={toggle} onSelect={handleSelectSinhVien} />
                  )}
                  <ControlledTextField control={control} name="hoTen" label="Họ tên" disabled />
                </Grid>
              </Grid>
              <Grid size={3}>
                <ControlledTextField label="Ngày sinh" control={control} name="ngaySinh" disabled />
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
              <Grid size={3}>
                <ControlledTextField
                  control={control}
                  readOnly
                  name="coSo"
                  label="Cơ sở"
                  disabled
                />
              </Grid>
              <Grid size={3}>
                <ControlledTextField
                  control={control}
                  readOnly
                  name="khoaHoc"
                  label="Khóa học"
                  disabled
                />
              </Grid>
              <Grid size={3}>
                <ControlledTextField
                  control={control}
                  readOnly
                  name="bacDaoTao"
                  label="Bậc đào tạo"
                  disabled
                />
              </Grid>
              <Grid size={3}>
                <ControlledTextField
                  control={control}
                  readOnly
                  name="loaiDaoTao"
                  label="Loại đào tạo"
                  disabled
                />
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid size={3}>
                <ControlledTextField control={control} readOnly name="nganh" label="Ngành" />
              </Grid>
              <Grid size={3}>
                <ControlledTextField
                  control={control}
                  readOnly
                  name="chuyenNganh"
                  label="Chuyên ngành"
                  disabled
                />
              </Grid>
              <Grid size={6}>
                <ControlledTextField
                  control={control}
                  readOnly
                  name="lopHocCu"
                  label="Lớp học"
                  disabled
                />
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid size={6}>
                <LopHocSelection
                  control={mainForm.control}
                  name="lopHocMoi"
                  label="Lớp học mới"
                  valueType={'object'}
                  required
                />
              </Grid>
              <Grid size={6}>
                <PhanLoaiChuyenLopTuDoSelection
                  control={mainForm.control}
                  name="phanLoaiChuyenLop"
                  label="Phân loại chuyển lớp"
                  required
                />
              </Grid>
            </Grid>
          </Stack>
        </Grid>
        <Grid size={2}>
          <ImageBox
            alt="Ảnh sinh viên"
            src={getValues('hinhTheSinhVienUrl') || undefined}
            placeholder="Ảnh"
            height={180}
          />
        </Grid>
      </Grid>
    </FilterDrawerBottom>
  );
});

export default ChuyenLopTuDoThongTinSinhVienForm;

ChuyenLopTuDoThongTinSinhVienForm.displayName = 'ChuyenLopTuDoThongTinSinhVienForm';
