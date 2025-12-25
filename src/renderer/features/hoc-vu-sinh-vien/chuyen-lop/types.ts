import { AuditableEntity, BacDaoTao, LoaiDaoTao, NganhHoc, SinhVien } from '@renderer/shared/types';
import { LopHoc } from '@renderer/features/hoc-vu-sinh-vien/danh-sach-lop-hoc/types';
import { PhanLoaiChuyenLop } from '@renderer/shared/enums';

export interface QuyetDinh {
  id?: string;
  soQuyetDinh?: string;
  tenQuyetDinh?: string;
  ngayRaQuyetDinh?: string | null;
  nguoiRaQD?: string | null;
  ngayKyQuyetDinh?: string | null;
  nguoiKyQD?: string | null;
  idLoaiQuyetDinh?: string | null;
  noiDung?: string | null;
}

export interface LopHocWithNavigation extends LopHoc {
  bacDaoTao?: BacDaoTao;
  loaiDaoTao?: LoaiDaoTao;
  nganhHoc?: NganhHoc;
}

export interface ChuyenLop extends AuditableEntity {
  id?: string;
  idSinhVien: string;
  sinhVien?: SinhVien;
  idLopCu: string;
  lopCu?: LopHocWithNavigation;
  idLopMoi: string;
  lopMoi?: LopHocWithNavigation;
  soQuyetDinh?: string | null;
  ngayRaQuyetDinh?: string | null;
  ngayChuyenLop: string;
  ghiChu?: string | null;
  phanLoaiChuyenLop: number;
  trichYeu?: string | null;
  idQuyetDinh?: string | null;
  quyetDinh?: QuyetDinh;
}

export interface ChuyenLopFilterState {
  idCoSo?: string;
  idKhoaHoc?: string;
  idBacDaoTao?: string;
  idLoaiDaoTao?: string;
  idNganh?: string;
  idChuyenNganh?: string;
}

export interface ChuyenLopPayload {
  idLopCu: string;
  idLopMoi: string;
  idDanhSachSinhVien: string[];
  phanLoaiChuyenLop: PhanLoaiChuyenLop;
}

export enum LoaiChuyenLop {
  LopCuSangLopMoi,
  LopMoiSangLopCu,
}
