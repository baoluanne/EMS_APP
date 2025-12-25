import { MucDoViPham } from './muc-do.types';
import { QuyCheHocVu } from './quy-che-hoc-vu.types';

export interface QuyCheTinChi {
  id: string;
  idQuyCheHocVu: string;
  quyCheHocVu?: QuyCheHocVu | null;
  soTinhChiNoToiHT?: number | null;
  isRangBuocDKT: boolean;
  heSoDiemLT?: number | null;
  heSoDiemTH?: number | null;
  isTinhTheoDiemLT: boolean;
  isSoCotDiemKTTK: boolean;
  soCotDiemKTTK?: number | null;

  dddS_DiemThuongKy?: number | null;
  dddS_DiemTBMon?: number | null;
  dddS_DiemTBChung?: number | null;
  dddS_DiemTKMon?: number | null;
  dddS_DiemTBHK?: number | null;

  dkdT_DaDongHP: boolean;
  dkdT_IsDiemTBThuongKy: boolean;
  dkdT_DiemTBThuongKy?: number | null;
  dkdT_IsDiemTBThuongXuyen: boolean;
  dkdT_DiemTBThuongXuyen?: number | null;
  dkdT_IsDiemGiuaKy: boolean;
  dkdT_DiemGiuaKy?: number | null;
  dkdT_IsDiemTieuLuan: boolean;
  dkdT_DiemTieuLuan?: number | null;
  dkdT_IsKhongVangQua: boolean;
  dkdT_PTTongVang?: number | null;
  dkdT_PTLyThuyet?: number | null;
  dkdT_PTThucHanh?: number | null;

  dktH_DiemThoiHocMoiHK?: number | null;
  dktH_SoHKCanhBaoMax?: number | null;
  dktH_DiemHKDau?: number | null;
  dktH_HKLienTiep?: number | null;
  dktH_DiemHKLienTiep?: number | null;
  dktH_DiemHKTiepTheo?: number | null;
  dktH_IsXetTamNgung: boolean;
  dktH_XetTamNgungTu?: number | null;
  dktH_XetTamNgungDen?: number | null;
  dktH_SoTNDiemF?: number | null;
  dktH_IsKiemTraNoHP: boolean;
  dktH_IsSoLanVP: boolean;
  dktH_SoLanVP?: number | null;
  dktH_IdMucDoVP?: string;
  dktH_MucDoVP?: MucDoViPham | null;
  dktH_IsShowGCMonHocRot: boolean;
  dktH_IsShowGCMonHocKhac: boolean;

  hbxL_IsThangDiem10: boolean;
  hbxL_IsDiemHaBacTu: boolean;
  hbxL_DiemHaBacTu?: number | null;
  hbxL_IsSoLanVPKL: boolean;
  hbxL_SoLanVPKL?: number | null;
  hbxL_IdMucDoVPKL?: string;
  hbxL_MucDoVPKL?: MucDoViPham | null;
  hbxL_IsSoLanVPQC: boolean;
  hbxL_SoLanVPQC?: number | null;
  hbxL_IdMucDoVPQC?: string;
  hbxL_MucDoVPQC?: MucDoViPham;
  hbxL_IsSoMonTLHL: boolean;
  hbxL_SoMonTLHL?: number | null;
  hbxL_IsTLHLChiLayMonTBC: boolean;
  hbxL_IsTLHLChiLauMonCTK: boolean;

  dH_DiemTB?: number | null;
  dh_DiemHK?: number | null;
  dh_SoTCDangKy?: number | null;

  hB_DiemTrungBinh?: number | null;
  hB_DiemTBToiThieu?: number | null;
  hB_SoTCDangKy?: number | null;
  hB_SoTCDKNam?: number | null;
}
