import { NamHoc } from "./nam-hoc.types";

export interface HocKy {
  id: string;
  idNamHoc: string;
  namHoc?: NamHoc;
  tenDot: string;
  soThuTu: number;
  soTuan?: number;
  heSo?: number;
  tuThang?: number;
  denThang?: number;
  namHanhChinh?: string;
  tuNgay?: number;
  denNgay?: number;
  tenDayDu?: string;
  tenTiengAnh?: string;
  ghiChu?: string;
  isActive: boolean;
  isVisible: boolean;
  isDKHP: boolean;
  isDKNTTT: boolean;
}
