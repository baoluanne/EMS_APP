export interface YeuCauSuaChuaFilterState {
  tieuDe?: string;
  trangThai?: string;
  phongKtxId?: string;
  sinhVienId?: string;
}

export interface YeuCauSuaChuaResponse {
  id: string;
  tieuDe: string;
  noiDung: string;
  trangThai: 'ChoXuLy' | 'DangXuLy' | 'HoanThanh' | 'TuChoi';
  ghiChuXuLy?: string | null;
  ngayXuLy?: string | null;
  sinhVienId: string;
  hoTenSinhVien: string;
  phongKtxId: string;
  maPhong: string;
  tenToaNha: string;
  taiSanKtxId?: string | null;
  tenTaiSan?: string | null;
  maTaiSan?: string | null;
  tinhTrangTaiSan?: string | null;
}
