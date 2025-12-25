import { ChiTietChuongTrinhKhungNienChe } from '@renderer/features/lap-chuong-trinh-khung-nien-che/types';
import { BacDaoTao } from './bac-dao-tao.types';
import { CoSoTaoDao } from './co-so-dao-tao.types';
import { KhoaHoc } from './khoa-hoc.types';
import { LoaiDaoTao } from './loai-dao-tao.types';
import { NganhHoc } from './nganh-hoc.types';

export interface ChuongTrinhKhungNienChe {
  id: string;
  maChuongTrinhKhungNienChe: string;
  coSoDaoTao: CoSoTaoDao;
  idCoSoDaoTao: string;
  bacDaoTao: BacDaoTao;
  idBacDaoTao: string;
  loaiDaoTao: LoaiDaoTao;
  idLoaiDaoTao: string;
  khoaHoc: KhoaHoc;
  idKhoaHoc: string;
  nganhHoc: NganhHoc;
  idNganhHoc: string;
  isBlock: boolean;
  ngayTao: Date;
  chiTietChuongTrinhKhungNienChes: ChiTietChuongTrinhKhungNienChe[];
}
