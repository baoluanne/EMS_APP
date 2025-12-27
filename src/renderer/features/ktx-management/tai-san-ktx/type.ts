export interface TaiSanKtxFilterState {
  id?: string;
  tenTaiSan?: string;
  tinhTrang?: string | null;
  phongKtxId?: string;
}

export interface TaiSanKtx {
  id?: string;
  maTaiSan: string;
  tenTaiSan: string;
  tinhTrang?: 'Tot' | 'BinhThuong' | 'CanSuaChua' | 'Hong' | null;
  giaTri?: number | null;
  ghiChu?: string | null;
  phongKtxId?: string | null;
}
