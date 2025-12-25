import { Grid, Stack } from '@mui/material';
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
import { useFormContext, useWatch } from 'react-hook-form';
import { CapNhatTrangThaiSinhVienSearch } from '../types';

export const CapNhatTrangThaiSinhVienSearchForm = () => {
  const { control } = useFormContext<CapNhatTrangThaiSinhVienSearch>();

  const [idHkttTinh, idHkttHuyen, idDcllTinh, idDcllHuyen] = useWatch({
    control,
    name: ['idHkttTinh', 'idHkttHuyen', 'idDcllTinh', 'idDcllHuyen'],
  });

  return (
    <Grid container spacing={2}>
      <Grid size={6}>
        <ControlledTextField control={control} name="noiSinh" label="Nơi sinh" />
      </Grid>
      <Grid size={6}>
        <ControlledTextField control={control} name="soDienThoai" label="Điện thoại" />
      </Grid>
      <Grid size={6}>
        <Stack direction="row" gap={2}>
          <ControlledTextField control={control} name="doTuoiTu" label="Độ tuổi từ" />
          <ControlledTextField control={control} name="doTuoiDen" label="Đến" />
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
        <DoiTuongChinhSachSelection control={control} name="doiTuongChinhSach" />
      </Grid>

      <Grid size={6}>
        <Stack direction="row" gap={2}>
          <ControlledTextField
            control={control}
            name="thuTuNhanHoSoTu"
            label="Thứ tự nhận hồ sơ từ"
          />
          <ControlledTextField control={control} name="thuTuNhanHoSoDen" label="Đến" />
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
          startName="ngayImportFrom"
          endName="ngayImportTo"
          startLabel="Ngày import từ"
          endLabel="Đến"
        />
      </Grid>
      <Grid size={6}>
        <ControlledTextField control={control} name="xuLyHocVu" label="Xử lý học vụ" />
      </Grid>

      <Grid size={6}>
        <ControlledTextField control={control} name="soQuyetDinh" label="Số quyết định" />
      </Grid>

      <Grid size={6}>
        <ControlledDateRangePicker
          control={control}
          startName="ngayRaQDFrom"
          endName="ngayRaQDTo"
          startLabel="Ngày ra QĐ từ"
          endLabel="Đến"
        />
      </Grid>

      <Grid size={6}>
        <DotRaQuyetDinhSelection control={control} name="idDotRaQuyetDinh" />
      </Grid>
      <Grid size={6}>
        <ControlledDateRangePicker
          control={control}
          startName="ngayKyFrom"
          endName="ngayKyQDTo"
          startLabel="Ngày ký từ"
          endLabel="Đến"
        />
      </Grid>
      <Grid size={6}>
        <DaKiemTraSelection control={control} name="daKiemTra" />
      </Grid>
      <Grid size={6}>
        <ControlledTextField control={control} name="nhom" label="Nhóm" />
      </Grid>

      <Grid size={6}>
        <ControlledTextField control={control} name="timNhanh" label="Tìm nhanh" />
      </Grid>

      <Grid size={6}>
        <TinhSelection control={control} name="idHkttTinh" label="HKTT Tỉnh" />
      </Grid>
      <Grid size={6}>
        <HuyenSelection
          control={control}
          name="idHkttHuyen"
          label="HKTT Huyện"
          idTinh={idHkttTinh}
        />
      </Grid>
      <Grid size={6}>
        <XaSelection
          control={control}
          name="idHkttPhuongXa"
          label="HKTT Phường xã"
          idHuyen={idHkttHuyen}
        />
      </Grid>

      <Grid size={6}>
        <ControlledTextField control={control} name="hkSoNha" label="HKTT Số nhà, thôn xóm" />
      </Grid>

      <Grid size={6}>
        <TinhSelection control={control} name="idDcllTinh" label="DCLL Tỉnh" />
      </Grid>
      <Grid size={6}>
        <HuyenSelection
          control={control}
          name="idDcllHuyen"
          label="DCLL Huyện"
          idTinh={idDcllTinh}
        />
      </Grid>
      <Grid size={6}>
        <XaSelection
          control={control}
          name="idDcllPhuongXa"
          label="DCLL Phường xã"
          idHuyen={idDcllHuyen}
        />
      </Grid>

      <Grid size={6}>
        <ControlledTextField control={control} name="dcllThonXom" label="DCLL thôn xóm" />
      </Grid>
      <Grid size={6}>
        <ControlledTextField control={control} name="dcllSoNha" label="DCLL số nhà" />
      </Grid>

      <Grid size={6}>
        <LoaiCuTruSelection control={control} name="idLoaiCuTru" />
      </Grid>

      <Grid size={6}>
        <TrungHocPhoThongTinhSelection control={control} name="idThptTinh" />
      </Grid>
      <Grid size={6}>
        <TrungHocPhoThongHuyenSelection control={control} name="idThptHuyen" />
      </Grid>
    </Grid>
  );
};
