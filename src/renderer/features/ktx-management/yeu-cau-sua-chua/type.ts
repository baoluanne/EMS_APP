export interface YeuCauSuaChuaFilterState {
  tieuDe?: string;
  trangThai?: string;
  phongKtxId?: string;
  sinhVienId?: string;
}

export const yeuCauSuaChuaDefaultFilters: YeuCauSuaChuaFilterState = {
  tieuDe: undefined,
  trangThai: undefined,
  phongKtxId: undefined,
  sinhVienId: undefined,
};
