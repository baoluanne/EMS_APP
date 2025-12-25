export enum TrangThaiSinhVienEnum {
  DangHoc = '0',
  DinhChi = '1',
  BaoLuu = '2',
  ThoiHoc = '3',
  DaTotNghiep = '4',
  VuotQuaThoiHanTotNghiep = '5',
  RutHocPhi = '6',
}

export const TrangThaiSinhVienOptions = [
  { label: 'Đang học', value: TrangThaiSinhVienEnum.DangHoc },
  { label: 'Đình chỉ', value: TrangThaiSinhVienEnum.DinhChi },
  { label: 'Bảo lưu', value: TrangThaiSinhVienEnum.BaoLuu },
  { label: 'Thôi học', value: TrangThaiSinhVienEnum.ThoiHoc },
  { label: 'Đã tốt nghiệp', value: TrangThaiSinhVienEnum.DaTotNghiep },
  { label: 'Vượt quá thời hạn tốt nghiệp', value: TrangThaiSinhVienEnum.VuotQuaThoiHanTotNghiep },
  { label: 'Rút học phí', value: TrangThaiSinhVienEnum.RutHocPhi },
];
