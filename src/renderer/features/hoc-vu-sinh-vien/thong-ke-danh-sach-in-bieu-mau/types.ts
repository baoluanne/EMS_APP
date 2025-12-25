export interface ThongKeDanhSachInBieuMauFilter {
  ngayInFrom?: string;
  ngayInTo?: string;
  maBieuMau?: string;
  maSinhVien?: string;
  hoTen?: string;
  mayIn?: string;
  nguoiIn?: string;
  trangThaiSinhVien?: string;
}

export const defaultThongKeDanhSachInBieuMauFilter = {
  ngayInFrom: undefined,
  ngayInTo: undefined,
  maBieuMau: undefined,
  maSinhVien: undefined,
  hoTen: undefined,
  mayIn: undefined,
  nguoiIn: undefined,
  trangThaiSinhVien: undefined,
};
