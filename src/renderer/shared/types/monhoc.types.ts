import { Khoa } from './khoa.types';

export interface MonHoc {
  id?: string;
  maMonHoc: string;
  tenMonHoc: string;
  khoaChuQuan?: string;
  toBoMon?: ToBoMon;
  maTuQuan?: string | null;
  tenTiengAnh?: string | null;
  tenVietTat?: string | null;
  ghiChu?: string | null;
  isKhongTinhTBC?: boolean | null;
  idLoaiMonHoc: string;
  loaiMonHoc?: any;
  idKhoa: string;
  khoa?: any;
  idToBoMon?: string | null;
  idLoaiTiet?: string | null;
  loaiTiet?: any;
  idKhoiKienThuc?: string | null;
  khoiKienThuc?: any;
  idTinhChatMonHoc?: string | null;
  tinhChatMonHoc?: any;
}

export interface MonHocBacDaoTao {
  id: string;
  bacDaoTao: string;
  maMonHoc: string;
  maTuQuan: string;
  tenMonHoc: string;
  tenTiengAnh: string;
  loaiMonHoc: string;
  'DVHT/TC': string;
  TCLT: string;
  TCTH: string;
  tuHoc: string;
  soTietTH: string;
  soGioThucTap: string;
  SoTietTuHoc: string;
  monHoc: MonHoc;
  idLoaiTiet?: string;
  isKhongTinhDiemTBC: boolean;
  soTinChi: number;
}

export interface TinhChatMonHoc {
  id?: string;
  maTinhChatMonHoc: string;
  tenTinhChatMonHoc: string;
}

export interface ToBoMon {
  id: string;
  tenToBoMon: string;
  khoa: Khoa;
}
