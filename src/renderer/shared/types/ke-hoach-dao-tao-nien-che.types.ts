import { ChiTietChuongTrinhKhungNienChe } from './chi-tiet-chuong-trinh-khung-nien-che.types';
import { HocKy } from './hoc-ky.types';

export interface KeHoachDaoTaoNienChe {
  idChiTietKhungHocKy_NienChe: string;
  chiTietChuongTrinhKhung_NienChe?: ChiTietChuongTrinhKhungNienChe;
  idHocKy: string;
  hocKy?: HocKy;
  isHocKyChinh: boolean;
  ghiChu?: string;
}
