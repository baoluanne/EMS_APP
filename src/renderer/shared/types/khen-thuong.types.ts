export interface KhenThuong {
  id?: string;
  maKhenThuong: string;
  tenKhenThuong: string;
  diemCong?: number;
  diemCongToiDa?: number;
  noiDung?: string;
  ghiChu?: string;
  idLoaiKhenThuong?: string | null;
  isViPhamNoiTru: boolean;
  loaiKhenThuong?: LoaiKhenThuong;
}

export interface LoaiKhenThuong {
  id: string;
  tenLoaiKhenThuong: string;
}
