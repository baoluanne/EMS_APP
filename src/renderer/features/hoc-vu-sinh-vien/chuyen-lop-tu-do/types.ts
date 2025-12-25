export interface ChuyenLopTuDoThongTinSinhVienState {
  maSinhVien?: string;
  hoTen?: string;
  ngaySinh?: string;
  gioiTinh?: string;

  coSo?: string;
  khoaHoc?: string;
  bacDaoTao?: string;
  loaiDaoTao?: string;

  nganh?: string;
  chuyenNganh?: string;
  lopHocCu?: string;
  lopHocMoi?: string;
  tenLopHocMoi?: string;

  idPhanLoaiChuyenLop?: string;
  hinhTheSinhVienUrl?: string;
}

export const defaultChuyenLopTuDoThongTinSinhVienState: ChuyenLopTuDoThongTinSinhVienState = {
  maSinhVien: '',
  hoTen: '',
  ngaySinh: '',
  gioiTinh: '',
  coSo: '',
  khoaHoc: '',
  bacDaoTao: '',
  loaiDaoTao: '',
  nganh: '',
  chuyenNganh: '',
  lopHocCu: '',
  lopHocMoi: '',
  tenLopHocMoi: '',
  idPhanLoaiChuyenLop: '',
  hinhTheSinhVienUrl: '',
};
