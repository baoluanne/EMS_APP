export interface ChiSoDienNuocRow {
  id: string;
  phongKtxId: string;
  maPhong: string;
  tenToaNha: string;
  thang: number;
  nam: number;
  dienCu: number;
  dienMoi: number;
  tieuThuDien: number;
  nuocCu: number;
  nuocMoi: number;
  tieuThuNuoc: number;
  daChot: boolean;
}

export interface ChiSoDienNuocFilterState {
  toaNhaId?: string;
  phongId?: string;
  thang?: number;
  nam?: number;
  daChot?: boolean;
}
