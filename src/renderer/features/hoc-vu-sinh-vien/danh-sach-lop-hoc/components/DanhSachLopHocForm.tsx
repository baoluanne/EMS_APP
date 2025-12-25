import Grid from '@mui/material/Grid';
import { ControlledCheckbox, ControlledTextField } from '@renderer/components/controlled-fields';
import { useFormContext } from 'react-hook-form';
import {
  BacDaoTaoSelection,
  ChuyenNganhSelection,
  CoSoSelection,
  KhoaHocSelection,
  KhoaSelection,
  LoaiDaoTaoSelection,
  NganhSelection,
} from '@renderer/components/selections';
import ControlledDatePicker from '../../../../components/controlled-fields/ControlledDatePicker';
import { CaHocSelection } from '@renderer/components/selections/CaHocSelection';
import { TimGiangVienSelection } from '@renderer/components/selections/TimGiangVien';

export const DanhSachLopHocForm = () => {
  const { control } = useFormContext();

  return (
    <Grid container spacing={2}>
      <Grid size={6}>
        <CoSoSelection control={control} name="idCoSoDaoTao" labelWidth={135} required />
      </Grid>
      <Grid size={3}>
        <ControlledTextField control={control} name="maLop" label="Mã lớp học" required />
      </Grid>
      <Grid size={3}>
        <ControlledTextField
          name="siSoHienTai"
          control={control}
          type="number"
          label="Sỉ số"
          required
        />
      </Grid>
      {/**/}
      <Grid size={6}>
        <KhoaHocSelection control={control} name="idKhoaHoc" required />
      </Grid>
      <Grid size={6}>
        <ControlledTextField control={control} name="tenLop" label="Tên lớp học" required />
      </Grid>
      {/**/}
      <Grid size={6}>
        <BacDaoTaoSelection control={control} name="idBacDaoTao" required />
      </Grid>
      <Grid size={6}>
        <ControlledTextField control={control} name="tenTiengAnh" label="Tên tiếng Anh" />
      </Grid>
      {/**/}
      <Grid size={6}>
        <LoaiDaoTaoSelection control={control} name="idLoaiDaoTao" required />
      </Grid>
      <Grid size={3}>
        <CaHocSelection name="idCaHoc" control={control} />
      </Grid>
      <Grid size={3}>
        <ControlledCheckbox control={control} name="isVisible" label="Hiển thị" />
      </Grid>
      {/**/}
      <Grid size={6}>
        <NganhSelection control={control} name="idNganhHoc" required />
      </Grid>
      <Grid size={6}>
        <TimGiangVienSelection control={control} name="idGiangVienChuNhiem" label="GV Chủ nhiệm" />
      </Grid>
      {/**/}
      <Grid size={6}>
        <ChuyenNganhSelection control={control} name="idChuyenNganh" labelWidth={135} required />
      </Grid>
      <Grid size={6}>
        <TimGiangVienSelection control={control} name="idCoVanHocTap" label="Cố vấn lớp học" />
      </Grid>
      {/**/}
      <Grid size={6}>
        <KhoaSelection name="idKhoa" control={control} required />
      </Grid>
      <Grid size={6}>
        <ControlledTextField control={control} name="kyTuMSSV" label="Ký tự MSSV" />
      </Grid>
      {/**/}
      <Grid size={6}>
        <ControlledTextField control={control} name="soHopDong" label="Số hợp đồng" />
      </Grid>
      <Grid size={6}>
        <ControlledDatePicker name="ngayHopDong" control={control} label="Ngày hợp đồng" />
      </Grid>
      {/**/}
      <Grid size={6}>
        <ControlledTextField
          name="soQuyetDinhThanhLapLop"
          control={control}
          label="Số quyết định thành lập lớp"
        />
      </Grid>
      <Grid size={6}>
        <ControlledDatePicker
          name="ngayRaQuyetDinh"
          control={control}
          label="Ngày ra quyết định thành lập lớp"
        />
      </Grid>
      {/**/}
      <Grid size={12}>
        <ControlledTextField control={control} name="ghiChu" label="Ghi chú" />
      </Grid>
    </Grid>
  );
};
