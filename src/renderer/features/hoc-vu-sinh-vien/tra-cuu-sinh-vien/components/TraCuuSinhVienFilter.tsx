import { Grid, Stack, Typography } from '@mui/material';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import ControlledDateRangePicker from '@renderer/components/controlled-fields/ControlledDateRangePicker';
import { ControlledSelect } from '@renderer/components/controlled-fields/ControlledSelect';
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
import { LoaiCuTruSelection } from '@renderer/components/selections/LoaiCuTruSelection';
import { useEffect } from 'react';
import { UseFormReturn, useWatch } from 'react-hook-form';
import { defaultSinhVienFilter, SinhVienFilter } from '../types';

interface Props {
  onApply: (filters: any) => void;
  filterMethods: UseFormReturn<SinhVienFilter, any, SinhVienFilter>;
}

export const TraCuuSinhVienFilter = ({ onApply, filterMethods }: Props) => {
  const { control, setValue } = filterMethods;
  const handleClear = () => {
    filterMethods.reset(defaultSinhVienFilter);
  };

  const watchedTinh = useWatch({ control, name: 'idTinh' });

  useEffect(() => {
    setValue('idHuyen', undefined);
  }, [setValue, watchedTinh]);

  return (
    <FilterDrawerBottom<any> onApply={onApply} onClear={handleClear} methods={filterMethods}>
      <Grid container rowSpacing={1} columnSpacing={4}>
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
          <KhoaSelection name="idKhoa" control={control} />
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
          <ControlledSelect
            options={[
              { value: 0, label: 'Nữ' },
              { value: 1, label: 'Nam' },
            ]}
            control={control}
            name="gioiTinh"
            label="Giới tính"
          />
        </Grid>
        <Grid size={4}>
          <ControlledTextField control={control} name="dienThoai" label="Điện thoại" />
        </Grid>
        <Grid size={4}>
          <ControlledTextField control={control} name="noiSinh" label="Nơi sinh" />
        </Grid>
        <Grid size={4}>
          <Stack direction={'row'} gap={2} sx={{ alignItems: 'center' }}>
            <ControlledTextField control={control} name="doTuoiTu" label="Độ tuổi" />
            <Typography component="span" sx={{ px: 0.5 }}>
              –
            </Typography>
            <ControlledTextField control={control} name="doTuoiDen" label="" />
          </Stack>
        </Grid>
        <Grid size={4}>
          <LoaiCuTruSelection name="loaiCuTru" control={control} />
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
          <TinhSelection name="idTinh" control={control} label="Hộ khẩu thường trú tỉnh" />
        </Grid>
        <Grid size={4}>
          <HuyenSelection
            name="idHuyen"
            idTinh={watchedTinh}
            control={control}
            label="Hộ khẩu thường trú huyện"
          />
        </Grid>
        <Grid size={4}>
          <ControlledTextField control={control} name="soNha" label="Số nhà, thôn xóm, phường xã" />
        </Grid>
        <Grid size={4}>
          <LoaiSinhVienSelection control={control} name="idLoaiSinhVien" />
        </Grid>
      </Grid>
    </FilterDrawerBottom>
  );
};
