export interface DonKtxResponse {
  id: string;
  maDon: string;
  sinhVienId: string;
  maSinhVien: string;
  hoTenSinhVien: string;
  loaiDon: string;
  trangThai: string;
  ngayGuiDon: string;
  lyDo: string | null;
  ghiChuDuyet: string | null;
  maPhongHienTai: string | null;
  maPhongMuonChuyen: string | null;
  maPhongDuocDuyet: string | null;

  ngayBatDauMongMuon: string;
  ngayHetHanMongMuon: string | null;

  ngayBatDauHienTai: string | null;
  ngayHetHanHienTai: string | null;
}

export interface DonKtxCreateInput {
  id?: string | null;
  idSinhVien: string;
  loaiDon: string;
  ngayBatDau: string;
  ngayHetHan?: string | null;
  ghichu?: string;
  phongHienTai?: string | null;
  phongMuonChuyen?: string | null;
  lyDoChuyen?: string;
}
