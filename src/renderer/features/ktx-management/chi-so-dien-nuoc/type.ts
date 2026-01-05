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

export interface ChiSoDienNuocFormData {
  id?: string;
  toaNhaId: string;
  phongKtxId: string;
  thangNam: Date | null;
  dienCu: number;
  dienMoi: number;
  nuocCu: number;
  nuocMoi: number;
  daChot: boolean;
}

export interface ChiSoDienNuocFilter {
  toaNhaId?: string;
  phongId?: string;
  thang?: number;
  nam?: number;
  daChot?: boolean;
}

export const defaultChiSoDienNuocFilter: ChiSoDienNuocFilter = {
  toaNhaId: '',
  phongId: '',
  thang: undefined,
  nam: undefined,
  daChot: undefined,
};
