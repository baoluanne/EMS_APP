import { LoaiHanhViViPham } from './nhom-phan-loai-hanh-vi-vi-pham.types';

export interface HanhViViPham {
  id?: string;
  maHanhVi: string;
  tenHanhVi: string;
  diemTru?: number;
  noiDung?: string;
  diemTruToiDa?: number;
  isViPhamNoiTru: boolean;
  isKhongSuDung: boolean;
  mucDo?: number;
  ghiChu?: string;
  idLoaiHanhVi: string;
  loaiHanhVi?: LoaiHanhViViPham;
}
