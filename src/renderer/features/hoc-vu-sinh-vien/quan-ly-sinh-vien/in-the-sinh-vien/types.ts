export interface InTheSVState {
  idCoSoDaoTao?: string;
  idKhoaHoc?: string;
  idBacDaoTao?: string;
  idLoaiDaoTao?: string;
  idNganhHoc?: string;
  idChuyenNganh?: string;

  idLopHoc?: string;
  maSinhVien?: string;
  hoDem?: string;
  ten?: string;

  isCoHinh?: string; // '', 'true', 'false'
  isInThe?: string; // '', 'true', 'false'

  idNhom?: string;
  idDot?: string;

  ngayImportHinhTu?: Date;
  ngayImportHinhDen?: Date;
  ngayNhapHocTu?: Date;
  ngayNhapHocDen?: Date;
}
