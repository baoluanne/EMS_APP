import { TrangThaiSinhVienEnum } from '@renderer/shared/enums/trang-thai-sinh-vien.enum';

export interface SinhVienFilter {
  idCoSoDaoTao?: string;
  idKhoaHoc?: string;
  idBacDaoTao?: string;
  idLoaiDaoTao?: string;
  idKhoa?: string;
  idNganhHoc?: string;
  idLopHoc?: string;
  trangThai?: TrangThaiSinhVienEnum;
  idDoiTuongUuTien?: string;
  idLoaiSinhVien?: string;
  doiTuongChinhSach?: string;

  maHoSo?: string;
  maSinhVien?: string;
  hoDem?: string;
  ten?: string;
  dienThoai?: string;
  noiSinh?: string;

  gioiTinh?: number;

  doTuoiTu?: number;
  doTuoiDen?: number;

  ngayNhapHocTu?: Date | string;
  ngayNhapHocDen?: Date | string;

  idTinh?: string;
  idHuyen?: string;
  idPhuongXa?: string;
  soNha?: string;
  hoKhauThuongTru?: string;
  loaiCuTru?: string;

  idQuocTich?: string;
  thuTuHoSoTu?: number;
  thuTuHoSoDen?: number;
  maLienKet?: string;
  ngayImportTu?: Date | string;
  ngayImportDen?: Date | string;
  idXuLyHocVu?: string;
  soQuyetDinh?: string;
  dcllThonXom?: string;
  nhom?: string;
  timNhanh?: string;
  ngayRaQuyetDinhTu?: Date | string;
  ngayRaQuyetDinhDen?: Date | string;
  ngayKyTu?: Date | string;
  ngayKyDen?: Date | string;
  kiemTra?: string;
}

export const defaultSinhVienFilter: SinhVienFilter = {
  // From Selection components (ids)
  idCoSoDaoTao: undefined,
  idKhoaHoc: undefined,
  idBacDaoTao: undefined,
  idLoaiDaoTao: undefined,
  idKhoa: undefined,
  idNganhHoc: undefined,
  idLopHoc: undefined,
  trangThai: undefined,
  idDoiTuongUuTien: undefined,
  idLoaiSinhVien: undefined,
  doiTuongChinhSach: undefined,

  // Text fields
  maHoSo: '',
  maSinhVien: '',
  hoDem: '',
  ten: '',
  dienThoai: '',
  noiSinh: '',

  gioiTinh: undefined,

  // Age range (years)
  doTuoiTu: undefined,
  doTuoiDen: undefined,

  // Ngày nhập học range
  ngayNhapHocTu: undefined,
  ngayNhapHocDen: undefined,

  // HKTT selections
  idTinh: undefined,
  idHuyen: undefined,
  soNha: '',
  hoKhauThuongTru: '',
  loaiCuTru: '',

  idQuocTich: undefined,
  thuTuHoSoTu: undefined,
  thuTuHoSoDen: undefined,
  maLienKet: undefined,
  ngayImportTu: undefined,
  ngayImportDen: undefined,
  idXuLyHocVu: undefined,
  soQuyetDinh: undefined,
  dcllThonXom: undefined,
  nhom: undefined,
  timNhanh: undefined,
  ngayRaQuyetDinhTu: undefined,
  ngayRaQuyetDinhDen: undefined,
  ngayKyTu: undefined,
  ngayKyDen: undefined,
  kiemTra: undefined,
};
