export interface DonKtxRow {
  id: string;
  maDon: string;
  hoTenSinhVien: string;
  maSinhVien: string;
  lop: string;
  loaiDon: string;
  trangThai: string;
  maPhongHienTai?: string | null;
  maPhongMuonChuyen?: string | null;
  maPhongDuocDuyet?: string | null;
  ngayGuiDon?: string | null;

  ngayBatDauMongMuon?: string | null;
  ngayHetHanMongMuon?: string | null;

  ngayBatDauHienTai?: string | null;
  ngayHetHanHienTai?: string | null;
}
