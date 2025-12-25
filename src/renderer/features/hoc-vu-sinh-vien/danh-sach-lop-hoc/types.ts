export interface LopHoc {
  id?: string;
  idCoSoDaoTao?: string;
  idKhoaHoc?: string;
  idBacDaoTao?: string;
  idLoaiDaoTao?: string;
  idNganh?: string;
  idChuyenNganh?: string;
  idKhoa?: string;
  soHopDong?: string;
  soQuyetDinhThanhLapLop?: string;
  ghiChu?: string;
  maLop?: string;
  siSo?: number;
  tenLop?: string;
  tenTiengAnh?: string;
  idCaHoc?: string;
  isVisible?: boolean;
  idGiaoVienChuNhiem?: string;
  idCoVanLopHoc?: string;
  ngayHopDong?: string;
  ngayRaQuyetDinh?: string;
  kyTuMaSoSinhVien?: string;
}

export interface DanhSachLopHocFilterState extends LopHoc {}
