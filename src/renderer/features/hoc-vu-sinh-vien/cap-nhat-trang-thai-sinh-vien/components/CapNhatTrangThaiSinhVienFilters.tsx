import { Grid, Stack } from '@mui/material';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import ControlledDateRangePicker from '@renderer/components/controlled-fields/ControlledDateRangePicker';
import { FilterDrawerBottom } from '@renderer/components/modals';
import {
  BacDaoTaoSelection,
  CoSoSelection,
  HuyenSelection,
  KhoaHocSelection,
  KhoaSelection,
  LoaiDaoTaoSelection,
  LoaiSinhVienSelection,
  LopHocSelection,
  NganhSelection,
  TinhSelection,
  TrangThaiSinhVienSelection,
} from '@renderer/components/selections';
import { DoiTuongChinhSachSelection } from '@renderer/components/selections/DoiTuongChinhSachSelection';
import { DoiTuongUuTienSelection } from '@renderer/components/selections/DoiTuongUuTienSelection';
import { GioiTinhSelection } from '@renderer/components/selections/GioiTinhSelection';
import { LoaiCuTruSelection } from '@renderer/components/selections/LoaiCuTruSelection';
import {
  CapNhatTrangThaiSinhVienFilter,
  defaultCapNhatTrangThaiSinhVienFilter,
} from '@renderer/features/hoc-vu-sinh-vien/cap-nhat-trang-thai-sinh-vien/types';
import { FilterFormProps } from '@renderer/shared/types';
import { useEffect } from 'react';
import { UseFormReturn, useWatch } from 'react-hook-form';

export const CapNhatTrangThaiSinhVienFilters = ({
  onApply,
  onClear,
  filterMethods,
}: FilterFormProps<CapNhatTrangThaiSinhVienFilter> & {
  filterMethods: UseFormReturn<CapNhatTrangThaiSinhVienFilter, any, CapNhatTrangThaiSinhVienFilter>;
}) => {
  const { control, setValue } = filterMethods;
  const handleClear = () => {
    filterMethods.reset(defaultCapNhatTrangThaiSinhVienFilter);
    onClear?.();
  };

  const watchedTinh = useWatch({ control, name: 'idTinh' });

  useEffect(() => {
    setValue('idHuyen', undefined);
  }, [setValue, watchedTinh]);

  return (
    <FilterDrawerBottom<CapNhatTrangThaiSinhVienFilter>
      onApply={onApply}
      onClear={handleClear}
      methods={filterMethods}
    >
      <Grid container spacing={2}>
        <Grid size={4}>
          <CoSoSelection control={control} name="idCoSoDaoTao" />
        </Grid>
        <Grid size={4}>
          <KhoaHocSelection control={control} name="idKhoaHoc" />
        </Grid>
        <Grid size={4}>
          <BacDaoTaoSelection control={control} name="idBacDaoTao" />
        </Grid>
        <Grid size={4}>
          <LoaiDaoTaoSelection control={control} name="idLoaiDaoTao" />
        </Grid>
        <Grid size={4}>
          <KhoaSelection control={control} name="idKhoa" />
        </Grid>
        <Grid size={4}>
          <NganhSelection control={control} name="idNganhHoc" />
        </Grid>
        <Grid size={4}>
          <LopHocSelection control={control} name="idLopHoc" />
        </Grid>
        <Grid size={4}>
          <TrangThaiSinhVienSelection control={control} name="trangThai" />
        </Grid>
        <Grid size={4}>
          <DoiTuongUuTienSelection control={control} name="idDoiTuongUuTien" />
        </Grid>
        <Grid size={4}>
          <DoiTuongChinhSachSelection control={control} name="doiTuongChinhSach" />
        </Grid>

        <Grid size={4}>
          <ControlledTextField control={control} name="maHoSo" label="Mã hồ sơ" />
        </Grid>
        <Grid size={4}>
          <ControlledTextField control={control} name="maSinhVien" label="Mã sinh viên" />
        </Grid>
        <Grid size={4}>
          <ControlledTextField control={control} name="hoDem" label="Họ đệm" />
        </Grid>
        <Grid size={4}>
          <ControlledTextField control={control} name="ten" label="Tên" />
        </Grid>
        <Grid size={4}>
          <GioiTinhSelection control={control} name="gioiTinh" />
        </Grid>
        <Grid size={4}>
          <ControlledTextField control={control} name="dienThoai" label="Điện thoại" />
        </Grid>
        <Grid size={4}>
          <ControlledTextField control={control} name="noiSinh" label="Nơi sinh" />
        </Grid>
        <Grid size={4}>
          <Stack direction="row" alignItems="center" gap={2}>
            <ControlledTextField control={control} name="doTuoiTu" label="Độ tuổi từ" />
            <ControlledTextField control={control} name="doTuoiDen" label="Độ tuổi đến" />
          </Stack>
        </Grid>
        <Grid size={4}>
          <LoaiCuTruSelection control={control} name="loaiCuTru" />
        </Grid>
        <Grid size={4}>
          <ControlledDateRangePicker
            control={control}
            startName="ngayNhapHocTu"
            endName="ngayNhapHocDen"
            startLabel="Ngày nhập học từ"
            endLabel="Ngày nhập học đến"
          />
        </Grid>
        <Grid size={4}>
          <TinhSelection control={control} name="idTinh" label="Hộ khẩu thường trú tỉnh" />
        </Grid>
        <Grid size={4}>
          <HuyenSelection
            control={control}
            name="idHuyen"
            label="Hộ khẩu thường trú huyện"
            idTinh={watchedTinh}
          />
        </Grid>
        <Grid size={4}>
          <ControlledTextField
            control={control}
            name="hoKhauThuongTru"
            label="Số nhà, thôn xóm, phường xã"
          />
        </Grid>
        <Grid size={4}>
          <LoaiSinhVienSelection control={control} name="idLoaiSinhVien" />
        </Grid>
      </Grid>
    </FilterDrawerBottom>
  );
};
