export interface ChuongTrinhKhungNienCheFilters {
  idCoSoDaoTao?: string;
  idKhoaHoc?: string;
  idBacDaoTao?: string;
  idLoaiDaoTao?: string;
  idNganhHoc?: string;
  idChuyenNganh?: string;
}

export const defaultChuongTrinhKhungNienCheFilters: ChuongTrinhKhungNienCheFilters = {
  idCoSoDaoTao: '',
  idKhoaHoc: '',
  idBacDaoTao: '',
  idLoaiDaoTao: '',
  idNganhHoc: '',
  idChuyenNganh: '',
};
