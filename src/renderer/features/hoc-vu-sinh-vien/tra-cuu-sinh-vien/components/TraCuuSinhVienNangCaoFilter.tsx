import { Button, Grid, Stack, Typography } from '@mui/material';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import ControlledDateRangePicker from '@renderer/components/controlled-fields/ControlledDateRangePicker';
import {
  DaKiemTraSelection,
  DanTocSelection,
  DoiTuongChinhSachSelection,
  DoiTuongUuTienSelection,
  DotRaQuyetDinhSelection,
  HuyenSelection,
  LoaiCuTruSelection,
  QuocTichSelection,
  TinhSelection,
  TonGiaoSelection,
  TrungHocPhoThongHuyenSelection,
  TrungHocPhoThongTinhSelection,
  XaSelection,
} from '@renderer/components/selections';
import { UseFormReturn, useWatch } from 'react-hook-form';
import { SinhVienFilter } from '../types';
import { useEffect } from 'react';
import { ControlledSelect } from '@renderer/components/controlled-fields/ControlledSelect';

interface Props {
  onSearch: () => void;
  filterMethods: UseFormReturn<SinhVienFilter, any, SinhVienFilter>;
}

const nhomOptions = Array.from({ length: 7 }, (_, index) => ({
  label: `Nhóm ${index + 1}`,
  value: index + 1,
}));

export const TraCuuSinhVienNangCaoFilter = (props: Props) => {
  const { control, setValue } = props.filterMethods;

  const watchedTinh = useWatch({ control, name: 'idTinh' });

  const watchedHuyen = useWatch({ control, name: 'idHuyen' });

  useEffect(() => {
    setValue('idHuyen', undefined);
  }, [setValue, watchedTinh]);

  useEffect(() => {
    setValue('idPhuongXa', undefined);
  }, [setValue, watchedHuyen]);

  return (
    <Grid container rowSpacing={1} columnSpacing={4}>
      <Grid size={6}>
        <ControlledTextField control={control} name="noiSinh" label="Nơi sinh" />
      </Grid>
      <Grid size={6}>
        <ControlledTextField control={control} name="dienThoai" label="Điện thoại" />
      </Grid>
      <Grid size={6}>
        <Stack direction={'row'} gap={1} sx={{ alignItems: 'center' }}>
          <ControlledTextField control={control} name="doTuoiTu" label="Độ tuổi từ" />
          <Typography component="span">–</Typography>
          <ControlledTextField control={control} name="doTuoiDen" label="Độ tuổi đến" />
        </Stack>
      </Grid>
      <Grid size={6}>
        <QuocTichSelection control={control} name="idQuocTich" label="Quốc tịch" />
      </Grid>
      <Grid size={6}>
        <DanTocSelection control={control} name="idDanToc" />
      </Grid>
      <Grid size={6}>
        <TonGiaoSelection control={control} name="idTonGiao" />
      </Grid>
      <Grid size={6}>
        <DoiTuongUuTienSelection control={control} name="idDoiTuongUuTien" />
      </Grid>
      <Grid size={6}>
        <DoiTuongChinhSachSelection control={control} name="idDoiTuongChinhSach" />
      </Grid>
      <Grid size={6}>
        <Stack direction={'row'} gap={1} sx={{ alignItems: 'center' }}>
          <ControlledTextField
            control={control}
            name="thuTuHoSoTu"
            type="number"
            label="Thứ tự nhận hồ sơ từ"
          />
          <Typography component="span">–</Typography>
          <ControlledTextField
            control={control}
            name="thuTuHoSoDen"
            type="number"
            label="Thứ tự nhận hồ sơ đến"
          />
        </Stack>
      </Grid>
      <Grid size={6}>
        <ControlledTextField control={control} name="maLienKet" label="Mã liên kết" />
      </Grid>
      <Grid size={6}>
        <ControlledDateRangePicker
          control={control}
          startName="ngayNhapHocTu"
          endName="ngayNhapHocDen"
          startLabel="Ngày nhập học từ"
          endLabel="Ngày nhập học đến"
        />
      </Grid>
      <Grid size={6}>
        <ControlledDateRangePicker
          control={control}
          startName="ngayImportTu"
          endName="ngayImportDen"
          startLabel="Ngày import từ"
          endLabel="Ngày import đến"
        />
      </Grid>
      <Grid size={6}>
        <ControlledTextField control={control} name="idXuLyHocVu" label="Xử lý học vụ" />
      </Grid>
      <Grid size={6}>
        <ControlledTextField control={control} name="soQuyetDinh" label="Số quyết định" />
      </Grid>
      <Grid size={6}>
        <ControlledDateRangePicker
          control={control}
          startName="ngayRaQuyetDinhTu"
          endName="ngayRaQuyetDinhDen"
          startLabel="Ngày ra quyết định từ"
          endLabel="Ngày ra quyết định đến"
        />
      </Grid>
      <Grid size={6}>
        <DotRaQuyetDinhSelection control={control} name="idDotRaQuyetDinh" />
      </Grid>
      <Grid size={6}>
        <ControlledDateRangePicker
          control={control}
          startName="ngayKyTu"
          endName="ngayKyDen"
          startLabel="Ngày ký từ"
          endLabel="Ngày ký đến"
        />
      </Grid>
      <Grid size={6}>
        <DaKiemTraSelection control={control} name="kiemTra" />
      </Grid>
      <Grid size={6}>
        <ControlledSelect control={control} name="nhom" label="Nhóm" options={nhomOptions} />
      </Grid>
      <Grid size={6}>
        <ControlledTextField control={control} name="timNhanh" label="Tìm nhanh" />
      </Grid>
      <Grid size={6}>
        <TinhSelection name="idTinh" control={control} label="HKTT tỉnh" />
      </Grid>
      <Grid size={6}>
        <HuyenSelection name="idHuyen" control={control} label="HKTT huyện" idTinh={watchedTinh} />
      </Grid>
      <Grid size={6}>
        <XaSelection
          control={control}
          name="idPhuongXa"
          label="HKTT Phường xã"
          idHuyen={watchedHuyen}
        />
      </Grid>
      <Grid size={6}>
        <ControlledTextField control={control} name="dcllThonXom" label="ĐCLL Thôn xóm" />
      </Grid>
      <Grid size={6}>
        <ControlledTextField control={control} name="soNha" label="ĐCLL Số nhà" />
      </Grid>
      <Grid size={6}>
        <LoaiCuTruSelection control={control} name="loaiCuTru" />
      </Grid>
      <Grid size={6}>
        <TrungHocPhoThongTinhSelection control={control} name="idThptTinh" />
      </Grid>
      <Grid size={6}>
        <TrungHocPhoThongHuyenSelection control={control} name="idThptHuyen" />
      </Grid>
      <Stack
        className={'w-full'}
        direction={'row'}
        sx={{ alignItems: 'center', justifyContent: 'center' }}
      >
        <Button variant="contained" onClick={props.onSearch}>
          Tìm kiếm
        </Button>
      </Stack>
    </Grid>
  );
};
