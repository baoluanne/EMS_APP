export interface NhomLoaiHanhViViPham {
  id: string;
  maNhomHanhVi: string;
  tenNhomHanhVi: string;
}

export interface LoaiHanhViViPham {
  id?: string;
  maLoaiHanhVi: string;
  tenLoaiHanhVi: string;
  stt?: number;
  diemTruToiDa?: number;
  isDiemTruCaoNhat?: boolean;
  ghiChu?: string;
  idNhomLoaiHanhVi: string;
  nhomLoaiHanhVi?: NhomLoaiHanhViViPham;
}
