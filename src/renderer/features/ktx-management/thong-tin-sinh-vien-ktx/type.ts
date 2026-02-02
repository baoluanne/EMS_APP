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
  isSapHetHan?: string;
  isQuaHan?: string;
  maSinhVien?: string;
  hoTen?: string;
  maPhong?: string;
  maGiuong?: string;
  trangThai?: string;
}

export const KtxTrangThaiSvOptions = [
  { label: 'Đang ở', value: '0' },
  { label: 'Đã rời', value: '1' },
];

export const thongTinSvKtxDefaultFilters: ThongTinSvKtxFilterState = {
  maSinhVien: undefined,
  hoTen: undefined,
  maPhong: undefined,
  maGiuong: undefined,
  trangThai: undefined,
  isSapHetHan: undefined,
  isQuaHan: undefined,
};
