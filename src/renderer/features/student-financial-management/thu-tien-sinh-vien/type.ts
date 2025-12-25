export interface PhieuThuSinhVien {
  id: string;
  soPhieu: string;
  sinhVienId: string;
  congNoId?: string;
  soTien: number;
  ngayThu: string; // date string
  hinhThucThanhToan: string;
  ghiChu?: string;
  sinhVien?: {
    maSinhVien: string;
    hoDem: string;
    ten: string;
  };
  congNo?: {
    namHocHocKy: { tenDot: string };
  };
}

export interface CreatePhieuThuDto {
  sinhVienId: string;
  congNoId?: string;
  soTien: number;
  hinhThucThanhToan: string;
  ghiChu?: string;
  xuatHoaDon: boolean;
  nhaCungCapHoaDon?: string;
  chiTiets?: {
    idCongNoChiTiet?: string;
    loaiKhoanThuId: string;
    soTien: number;
    ghiChu?: string;
  }[];
}

export interface CongNoChuaDong {
  congNoId: string;
  hocKy: string;
  hanNop?: string;
  phaiThu: number;
  daThu: number;
  mienGiam: number;
  conNo: number;
}
