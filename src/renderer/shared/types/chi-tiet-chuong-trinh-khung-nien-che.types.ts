import { ChuongTrinhKhungNienChe } from './chuong-trinh-khung-nien-che.types';
import { MonHocBacDaoTao } from './monhoc.types';

export interface ChiTietChuongTrinhKhungNienChe {
  id: string;
  isBatBuoc: boolean;
  idChuongTrinhKhung: string;
  chuongTrinhKhungNienChe: ChuongTrinhKhungNienChe;
  idMonHocHeDaoTao: string;
  monHocHeDaoTao: MonHocBacDaoTao;
  hocKy: number;
}
