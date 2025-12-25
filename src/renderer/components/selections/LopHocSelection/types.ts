export interface ThongTinTimKiemLopHocState {
  id?: string;
  maSinhVien: string;
  hoDem: string;
  ten: string;
  gioiTinh: string;
  ngaySinhTu: string;
  ngaySinhDen: string;
  diaChi: string;
  coSo: string;
  khoaHoc: string;
  bacDaoTao: string;
  loaiDaoTao: string;
  nganh: string;
  chuyenNganh: string;
  lopHoc: string;
  maLopHoc: string;
  tenLopHoc: string;
  trangThai: string;
}

export const defaultThongTinTimKiemLopHocState: ThongTinTimKiemLopHocState = {
  id: '',
  maSinhVien: '',
  hoDem: '',
  ten: '',
  gioiTinh: '',
  ngaySinhTu: '',
  ngaySinhDen: '',
  diaChi: '',
  coSo: '',
  khoaHoc: '',
  bacDaoTao: '',
  loaiDaoTao: '',
  nganh: '',
  chuyenNganh: '',
  lopHoc: '',
  maLopHoc: '',
  tenLopHoc: '',
  trangThai: '',
};
