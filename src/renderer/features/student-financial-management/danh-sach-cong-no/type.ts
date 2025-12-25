export interface ChiTietKhoanThuDto {
  loaiKhoanThuId: string;
  soTien: number;
  ghiChu: string;
}

export interface AddKhoanThuDto {
  sinhVienId: string;
  namHocHocKyId: string;
  hanNop: string | null;
  chiTiets: ChiTietKhoanThuDto[];
}
export interface CongNoSinhVien {
  id: string;
  sinhVienId: string;
  namHocHocKyId: string;

  maSinhVien: string;
  hoTen: string;
  tenHocKy: string;

  daThu: number;
  tongMienGiam: number;
  conNo: number;
  hanNop: string;
  ghiChu: string;
}
