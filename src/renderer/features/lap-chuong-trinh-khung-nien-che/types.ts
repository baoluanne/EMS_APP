import { MonHocBacDaoTao } from '@renderer/shared/types';

export interface ChiTietChuongTrinhKhungNienChe {
  id: string;
  isBatBuoc?: boolean;
  idMonHocBacDaoTao?: string;
  MonHocBacDaoTao?: MonHocBacDaoTao;
  hocKy: number;
  soTinChiBatBuoc?: number;
  soTinChiTuChon?: number;
}

export interface LapChuongTrinhKhungNienChe {
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
  chiTietChuongTrinhKhungNienChes: ChiTietChuongTrinhKhungNienChe[];
}
