import { LoaiPhong } from './loai-phong.types';
import { TinhChatMonHoc } from './monhoc.types';

export interface PhongHoc {
  id?: string;
  maPhong: string;
  tenPhong: string;
  soBan?: number;
  soChoNgoi?: number;
  soChoThi?: number;
  isNgungDungMayChieu: boolean;
  ghiChu?: string;
  idDayNha: string;
  idTCMonHoc?: string;
  tcMonHoc?: TinhChatMonHoc;
  idLoaiPhong?: string;
  loaiPhong?: LoaiPhong;
}
