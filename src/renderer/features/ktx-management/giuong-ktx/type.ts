export interface GiuongKtx {
  id?: string | null;
  maGiuong: string;
  phongKtxId: string;
  maPhong: string;
  tenToaNha: string;
  sinhVienId?: string | null;
  tenSinhVien?: string | null;
  trangThai: string;
}

export interface GiuongKtxFilterState {
  maGiuong?: string;
  phongId?: string;
  trangThai?: string;
}
