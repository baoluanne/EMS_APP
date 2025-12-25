import { MucDoViPham } from './muc-do.types';

export interface HinhThucXuLyVPQCThi {
  id?: string;
  maHinhThucXL: string;
  tenHinhThucXL: string;
  phanTramDiemTru?: number;
  diemTruRL?: number;
  mucDo?: MucDoViPham;
  idMucDo: string;
  ghiChu?: string;
}
