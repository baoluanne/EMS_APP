import { BacDaoTao } from './bac-dao-tao.types';
import { LoaiDaoTao } from './loai-dao-tao.types';
import { QuyCheNienChe } from './quy-che-nien-che.types';
import { QuyCheTinChi } from './quy-che-tin-chi.types';

export interface ApDungQuyCheHocVu {
  id?: string;
  idKhoaHoc: string;
  idBacDaoTao: string;
  bacDaoTao?: BacDaoTao;
  idLoaiDaoTao: string;
  loaiDatao?: LoaiDaoTao;
  idQuyCheTC?: string;
  quyCheTC?: QuyCheTinChi;
  idQuyCheNC?: string;
  quyCheNC?: QuyCheNienChe;
  choPhepNoMon: number;
  choPhepNoDVHT: number;
  ghiChu?: string | null;
}
