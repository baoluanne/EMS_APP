import { CoSoTaoDao } from './co-so-dao-tao.types';

export interface LyDoXinPhong {
  id?: string;
  maLoaiXinPhong: string;
  tenLoaiXinPhong: string;
  soThuTu?: number;
}

export interface DiaDiemPhong {
  id?: string;
  maDDPhong: string;
  tenNhomDDPhong: string;
  diaChi: string;
  idCoSoDaoTao: string;
  diaDiem: string;
  banKinh?: number;
  ghiChu?: string;
  coSoDaoTao?: CoSoTaoDao;
}
