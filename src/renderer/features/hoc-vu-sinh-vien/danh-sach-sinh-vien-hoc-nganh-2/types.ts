import { DangKyNganh2FormData, SinhVienHocNganh2Filter } from './validations';

export const defaultDsSinhVienHocNganh2FilterState: SinhVienHocNganh2Filter = {
  idCoSo: null,
  idKhoaHoc: null,
  idBacDaoTao: null,
  idLoaiDaoTao: null,
  idNganh: null,
  idChuyenNganh: null,
  idLopHoc: null,
  maSinhVien: null,
  hoDem: null,
  tenSV: null,
  trangThai: null,
};

export const defaultDangKyNganh2FormDataState: DangKyNganh2FormData = {
  id: '',
  idSinhVien: '',
  maSinhVien: '',
  idCoSo: '',
  idKhoaHoc2: '',
  idNganh2: '',
  idLopHoc2: '',
  ghiChu: '',
  soQuyetDinh: '',
  ngayQuyetDinh: null,
  nguoiKy: '',
};
