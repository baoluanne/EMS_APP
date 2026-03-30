export enum TrangThaiThietBiEnum {
  TrongKho = 0,
  DangSuDung = 1, // Bao gồm cả Đang Mượn
  CanBaoTri = 2,  // Thay thế cho Hỏng và Đang Bảo Trì
  ThanhLy = 3,    // Thay thế cho Chờ Thanh Lý và Đã Thanh Lý
  Mat = 4
}

export const TrangThaiThietBiOptions = [
  { value: TrangThaiThietBiEnum.TrongKho, label: 'Trong kho' },
  { value: TrangThaiThietBiEnum.DangSuDung, label: 'Đang sử dụng' },
  { value: TrangThaiThietBiEnum.CanBaoTri, label: 'Cần bảo trì' },
  { value: TrangThaiThietBiEnum.ThanhLy, label: 'Thanh lý' },
  { value: TrangThaiThietBiEnum.Mat, label: 'Mất' },
];

export const getTrangThaiThietBiLabel = (value?: number | null): string => {
  if (value === undefined || value === null) return '';
  const option = TrangThaiThietBiOptions.find((opt) => opt.value === value);
  return option?.label || '';
};

export enum LoaiBaoTriEnum {
  BaoDuongDinhKy = 0,
  SuaChuaSuCo = 1,
  NangCap = 2
}

export const LoaiBaoTriOptions = [
  { value: LoaiBaoTriEnum.BaoDuongDinhKy, label: 'Bảo dưỡng định kỳ' },
  { value: LoaiBaoTriEnum.SuaChuaSuCo, label: 'Sửa chữa sự cố' },
  { value: LoaiBaoTriEnum.NangCap, label: 'Nâng cấp' },
];

export enum LoaiDoiTuongMuonEnum {
  SinhVien = 1,
  GiangVien = 2,
  Khac = 3
}

export const LoaiDoiTuongMuonOptions = [
  { value: LoaiDoiTuongMuonEnum.SinhVien, label: 'Sinh viên' },
  { value: LoaiDoiTuongMuonEnum.GiangVien, label: 'Giảng viên' },
  { value: LoaiDoiTuongMuonEnum.Khac, label: 'Khác' },
];

export enum TrangThaiPhieuMuonEnum {
  DangMuon = 0,
  DaTra = 1,
  QuaHan = 2,
}

export const TrangThaiPhieuMuonOptions = [
  { value: TrangThaiPhieuMuonEnum.DangMuon, label: 'Đang mượn' },
  { value: TrangThaiPhieuMuonEnum.DaTra, label: 'Đã trả' },
  { value: TrangThaiPhieuMuonEnum.QuaHan, label: 'Quá hạn' },
];

export enum LoaiSuKienThietBiEnum {
  TaoMoi = 0,        
  PhanPhong = 1,     
  DieuChuyen = 2,    
  BaoTri = 3,        
  MuonTra = 4,       
  KiemKe = 5,        
  ThanhLy = 6        
}

export enum TrangThaiPhieuBaoTriEnum {
  ChoXuLy = 0,    
  DangBaoTri = 1, 
  HoanThanh = 2,   
  DaHuy = 3        
}

export const TrangThaiPhieuBaoTriOptions = [
  { value: TrangThaiPhieuBaoTriEnum.ChoXuLy, label: 'Chờ xử lý' },
  { value: TrangThaiPhieuBaoTriEnum.DangBaoTri, label: 'Đang bảo trì' },
  { value: TrangThaiPhieuBaoTriEnum.HoanThanh, label: 'Hoàn thành' },
  { value: TrangThaiPhieuBaoTriEnum.DaHuy, label: 'Đã hủy' },
];
