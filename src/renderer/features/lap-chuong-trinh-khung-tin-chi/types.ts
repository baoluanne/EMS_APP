import { MonHocBacDaoTao } from "@renderer/shared/types";

export interface LapChuongTrinhKhungTinChiFilters {
  idCoSoDaoTao?: string;
  idKhoaHoc?: string;
  idBacDaoTao?: string;
  idLoaiDaoTao?: string;
  idNganhHoc?: string;
  idChuyenNganh?: string;
  ghiChu?: string;
  ghiChuTiengAnh?: string;
}

export interface LapChuongTrinhKhungTinChi {
  id?: string;
  idCoSoDaoTao?: string;
  idKhoaHoc?: string;
  idBacDaoTao?: string;
  idLoaiDaoTao?: string;
  idNganhHoc?: string;
  idChuyenNganh?: string;
  ghiChu?: string;
  ghiChuTiengAnh?: string;
  isBlock?: boolean;
  chiTietKhungHocKyTinChis: ChiTietKhungHocKyTinChi[];
}

export interface ChiTietKhungHocKyTinChi {
  id: string;
  isBatBuoc?: boolean;
  idMonHocBacDaoTao?: string;
  MonHocBacDaoTao?: MonHocBacDaoTao;
  hocKy: number;
  soTinChiBatBuoc?: number;
  soTinChiTuChon?: number;
}