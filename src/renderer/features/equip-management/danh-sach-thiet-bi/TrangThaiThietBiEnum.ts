export enum TrangThaiThietBiEnum {
  MoiNhap = 0,
  DangSuDung = 1,
  DangBaoTri = 2,
  DangMuon = 3,
  Hong = 4,
  ChoThanhLy = 5,
  DaThanhLy = 6,
  Mat = 7,
}
export const TrangThaiThietBiOptions = [
  { value: TrangThaiThietBiEnum.MoiNhap, label: 'Mới nhập' },
  { value: TrangThaiThietBiEnum.DangSuDung, label: 'Đang sử dụng' },
  { value: TrangThaiThietBiEnum.DangBaoTri, label: 'Đang bảo trì' },
  { value: TrangThaiThietBiEnum.DangMuon, label: 'Đang mượn' },
  { value: TrangThaiThietBiEnum.Hong, label: 'Hỏng' },
  { value: TrangThaiThietBiEnum.ChoThanhLy, label: 'Chờ thanh lý' },
  { value: TrangThaiThietBiEnum.DaThanhLy, label: 'Đã thanh lý' },
  { value: TrangThaiThietBiEnum.Mat, label: 'Mất' },
];

export const getTrangThaiLabel = (value?: number | null): string => {
  if (value === undefined || value === null) return '';
  const option = TrangThaiThietBiOptions.find((opt) => opt.value === value);
  return option?.label || '';
};
