import { GiangVien } from '@renderer/shared/types';
import { TimKiemLHPType } from './validations';

export const defaultThongTinTimKiemLHPState: TimKiemLHPType = {
  maLHP: '',

  idHocKy: '',
  idCoSo: '',
  idKhoaHoc: '',
  idNganh: '',
  idLopDanhNghia: '',
  loaiLHP: undefined,
  loaiMonLTTH: undefined,
  idLoaiDaoTao: '',
  lopBanDau: '',
  idLoaiMonHoc: '',
  trangThaiLHP: undefined,
  idKhoaChuQuan: '',
  idBacDaoTao: '',
  idChuyenNganh: '',
  idMonHoc: '',
  idHinhThucThi: '',

  ngayHocCuoiTu: '',
  ngayHocCuoiDen: '',
};

export interface LopHocPhanRecord {
  id: string;
  maLopHocPhan: string;
  tenLopHocPhan: string;
  giangVien: GiangVien;
  nhom: number;
}
