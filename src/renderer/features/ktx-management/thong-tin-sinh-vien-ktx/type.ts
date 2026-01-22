export interface ThongTinSinhVienKtx {
  sinhVienId: string;
  maSinhVien: string;
  hoTen: string;
  lop?: string;
  chuyenNganh?: string;
  tenToaNha: string;
  maPhong: string;
  maGiuong: string;
  trangThaiGiuong: string;
  ngayVaoO?: string | null;
  ngayHetHan?: string | null;
}

export interface ThongTinSvKtxFilterState {
  maSinhVien?: string;
  hoTen?: string;
  maPhong?: string;
  maGiuong?: string;
  trangThai?: number | undefined;
}

export const KtxTrangThaiSvOptions = [
  { label: 'Đang ở', value: 0 },
  { label: 'Đã rời', value: 1 },
];

export const thongTinSvKtxDefaultFilters: ThongTinSvKtxFilterState = {
  maSinhVien: '',
  hoTen: '',
  maPhong: '',
  maGiuong: '',
  trangThai: undefined,
};
