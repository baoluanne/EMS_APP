export interface SinhVienLopHocPhan {
  id?: string;
}

export interface SinhVienLopHocPhanFilterState extends SinhVienLopHocPhan {
  idHocKy: string;
  maLHP: string;
  tenLHP?: string;
  nhom?: number;
  trangThaiSinhVien?: string;
  trangThaiDangKyLHP?: string[];
  hocPhiFilter?: string;
  hocPhi?: boolean;
}

export const defaultSinhVienLopHocPhanFilterState: SinhVienLopHocPhanFilterState = {
  id: undefined,
  idHocKy: '',
  maLHP: '',
  tenLHP: undefined,
  nhom: undefined,
  trangThaiSinhVien: undefined,
  trangThaiDangKyLHP: undefined,
  hocPhiFilter: 'All',
};

export const hocPhiOptions = [
  { value: 'All', label: 'Tất cả' },
  { value: 'true', label: 'Đã đóng' },
  { value: 'false', label: 'Chưa đóng' },
];
