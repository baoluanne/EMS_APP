export interface ChuongTrinhKhungTinChiFilters {
  idCoSoDaoTao?: string;
  idKhoaHoc?: string;
  idBacDaoTao?: string;
  idLoaiDaoTao?: string;
  idNganhHoc?: string;
  idChuyenNganh?: string;
}

export const defaultChuongTrinhKhungTinChiFilters: ChuongTrinhKhungTinChiFilters = {
  idCoSoDaoTao: '',
  idKhoaHoc: '',
  idBacDaoTao: '',
  idLoaiDaoTao: '',
  idNganhHoc: '',
  idChuyenNganh: '',
};
