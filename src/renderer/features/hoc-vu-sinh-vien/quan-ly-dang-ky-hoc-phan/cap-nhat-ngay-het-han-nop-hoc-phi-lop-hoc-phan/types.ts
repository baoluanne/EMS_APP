export interface CapNhatNgayHetHanNopHocPhiLopHocPhanFilters {
  idDot?: string;
  idCoSo?: string;
  idKhoaChuQuan?: string;
  idKhoaChuQuanLop?: string;
  idKhoaHoc?: string;
  idBacDaoTao?: string;
  idLoaiDaoTao?: string;
  idNganh?: string;
  idChuyenNganh?: string;
  idTrangThaiLHP?: string;
  idLoaiLop?: string;
  lopHoc?: string;
  monHocLopHocPhan?: string;
  // HP 1 (Tuition Payment 1)
  ngayHetHanHP1Tu?: string;
  ngayHetHanHP1Den?: string;
  trangThaiHP1?: string; // 'all' | 'expired' | 'notExpired'
  // HP 2 (Tuition Payment 2)
  ngayHetHanHP2Tu?: string;
  ngayHetHanHP2Den?: string;
  trangThaiHP2?: string; // 'all' | 'expired' | 'notExpired'
}
