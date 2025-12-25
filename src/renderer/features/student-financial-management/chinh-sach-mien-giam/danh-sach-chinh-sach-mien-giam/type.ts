export interface ChinhSachMienGiam {
  id: string;
  tenChinhSach: string;
  loaiChinhSach: 'PhanTram' | 'SoTien';
  giaTri: number;

  namHocHocKyId?: string;
  namHocHocKy?: { tenDot: string };

  apDungCho: 'TatCa' | 'Lop' | 'Nganh' | 'SinhVien' | 'DoiTuong';
  doiTuongId?: string;
  ngayBatDau?: string;
  ngayKetThuc?: string;
  ghiChu?: string;
  dangKichHoat?: boolean;
}
