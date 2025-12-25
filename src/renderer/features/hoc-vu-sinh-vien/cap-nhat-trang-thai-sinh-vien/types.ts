export type CapNhatTrangThaiSinhVienFilter = {
  idCoSoDaoTao?: string;
  idKhoaHoc?: string;
  idBacDaoTao?: string;
  idLoaiDaoTao?: string;
  idKhoa?: string;
  idNganhHoc?: string;
  idLopHoc?: string;
  idLoaiSinhVien?: string;
  trangThai?: string;
  idDoiTuongUuTien?: string;
  idDoiTuongChinhSach?: string;
  idLoaiCuTru?: string;
  idTinh?: string;
  idHuyen?: string;
  hoKhauThuongTru?: string;

  maHoSo?: string;
  maSinhVien?: string;
  hoDem?: string;
  ten?: string;
  gioiTinh?: string;
  dienThoai?: string;
  noiSinh?: string;
  diaChi?: string;

  nguoiCapNhat?: string;
  soQuyetDinh?: string;
  ghiChu?: string;

  doTuoiTu?: string;
  doTuoiDen?: string;

  ngayNhapHocTu?: string;
  ngayNhapHocDen?: string;
  ngayTaoFrom?: string;
  ngayTaoTo?: string;
  ngayRaQuyetDinhFrom?: string;
  ngayRaQuyetDinhTo?: string;
};

export type CapNhatTrangThaiSinhVienSearch = {
  noiSinh?: string;
  soDienThoai?: string;
  idQuocTich?: string;
  doTuoiTu?: string;
  doTuoiDen?: string;
  idDanToc?: string;
  idTonGiao?: string;
  idDoiTuongUuTien?: string;
  idDoiTuongChinhSach?: string;
  thuTuNhanHoSoTu?: string;
  thuTuNhanHoSoDen?: string;
  maLienKet?: string;
  xuLyHocVu?: string;
  soQuyetDinh?: string;
  nhom?: string;
  timNhanh?: string;

  ngayNhapHocTu?: string;
  ngayNhapHocDen?: string;
  ngayImportFrom?: string;
  ngayImportTo?: string;
  ngayRaQDFrom?: string;
  ngayRaQDTo?: string;
  ngayKyFrom?: string;
  ngayKyQDTo?: string;

  idDotRaQuyetDinh?: string;
  daKiemTra?: string;

  // HKTT
  idHkttTinh?: string;
  idHkttHuyen?: string;
  idHkttPhuongXa?: string;
  hkSoNha?: string;

  // DCLL
  idDcllTinh?: string;
  idDcllHuyen?: string;
  idDcllPhuongXa?: string;
  dcllThonXom?: string;
  dcllSoNha?: string;

  // THPT
  idThptTinh?: string;
  idThptHuyen?: string;

  idLoaiCuTru?: string;
};

export const defaultCapNhatTrangThaiSinhVienFilter: CapNhatTrangThaiSinhVienFilter &
  CapNhatTrangThaiSinhVienSearch = {
  idCoSoDaoTao: undefined,
  idKhoaHoc: undefined,
  idBacDaoTao: undefined,
  idLoaiDaoTao: undefined,
  idKhoa: undefined,
  idNganhHoc: undefined,
  idLopHoc: undefined,
  idLoaiSinhVien: undefined,
  trangThai: undefined,
  idDoiTuongUuTien: undefined,
  idDoiTuongChinhSach: undefined,
  idLoaiCuTru: undefined,
  idTinh: undefined,
  idHuyen: undefined,
  hoKhauThuongTru: undefined,

  maHoSo: undefined,
  maSinhVien: undefined,
  hoDem: undefined,
  ten: undefined,
  gioiTinh: undefined,
  soDienThoai: undefined,
  noiSinh: undefined,
  diaChi: undefined,

  nguoiCapNhat: undefined,
  soQuyetDinh: undefined,
  ghiChu: undefined,

  doTuoiTu: undefined,
  doTuoiDen: undefined,

  ngayNhapHocTu: undefined,
  ngayNhapHocDen: undefined,
  ngayTaoFrom: undefined,
  ngayTaoTo: undefined,
  ngayRaQuyetDinhFrom: undefined,
  ngayRaQuyetDinhTo: undefined,

  idQuocTich: undefined,
  idDotRaQuyetDinh: undefined,
  daKiemTra: undefined,

  thuTuNhanHoSoTu: undefined,
  thuTuNhanHoSoDen: undefined,
  maLienKet: undefined,
  xuLyHocVu: undefined,
  nhom: undefined,
  timNhanh: undefined,

  ngayImportFrom: undefined,
  ngayImportTo: undefined,
  ngayRaQDFrom: undefined,
  ngayRaQDTo: undefined,
  ngayKyFrom: undefined,
  ngayKyQDTo: undefined,

  idHkttTinh: undefined,
  idHkttHuyen: undefined,
  idHkttPhuongXa: undefined,
  hkSoNha: undefined,

  idDcllTinh: undefined,
  idDcllHuyen: undefined,
  idDcllPhuongXa: undefined,
  dcllThonXom: undefined,
  dcllSoNha: undefined,

  idThptTinh: undefined,
  idThptHuyen: undefined,
};
