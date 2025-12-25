export interface IKeHoachDaoTaoNienCheFilters {
  idHocKy?: string;
  idCoSoDaoTao?: string;
  idKhoaHoc?: string;
  idBacDaoTao?: string;
  idLoaiDaoTao?: string;
  idNganhHoc?: string;
  hocKy?: string;
}

export interface TaoKeHoachDaoTaoNienCheFilters {
  idCoSo?: string;
  idKhoaHoc?: string;
  idBacDaoTao?: string;
  idLoaiDaoTao?: string;
  idNganhHoc?: string;
  hocKy?: number;
}

export interface DanhSachNganhHocFilters {
  ghiChu?: string;
  idBacDaoTao?: string;
}
