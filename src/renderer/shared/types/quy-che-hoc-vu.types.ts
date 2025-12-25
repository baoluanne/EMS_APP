export interface QuyCheHocVu {
  id?: string;
  maQuyChe: string;
  tenQuyChe: string;
  bieuThuc?: string;
  isNienChe: boolean;
  ghiChu?: string;

  dkdT_IsDongHocPhi: boolean;
  dkdT_IsDiemTBTK: boolean;
  dkdT_IsDiemTBTH: boolean;
  dkdT_IsKhongVangQua: boolean;
  dkdT_DiemTBTK?: number;
  dkdT_DiemTBTH?: number;
  dkdT_TongTietVang?: number;
  dkdT_DuocThiLai?: number;
  dkdT_LyThuyet?: number;
  dkdT_ThucHanh?: number;

  dddS_DiemThanhPhan?: number;
  dddS_DiemCuoiKy?: number;
  dddS_DiemTBThuongKy?: number;
  dddS_DiemTBTH?: number;
  dddS_DiemTB?: number;
  dddS_DiemTBHK?: number;
  dddS_DiemTN?: number;
  dddS_DiemTK?: number;
  dddS_KieuLamTron?: string;
}
