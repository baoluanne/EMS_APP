export enum KtxDonTrangThai {
  ChoDuyet = 0,
  DaDuyet = 1,
  TuChoi = 2,
  DaHuy = 3,
}

export enum KtxLoaiDon {
  DangKyMoi = 0,
  GiaHan = 1,
  ChuyenPhong = 2,
  RoiKtx = 3,
}

export const KtxDonTrangThaiOptions = [
  { value: KtxDonTrangThai.ChoDuyet, label: 'Chờ duyệt', color: 'warning' },
  { value: KtxDonTrangThai.DaDuyet, label: 'Đã duyệt', color: 'success' },
  { value: KtxDonTrangThai.TuChoi, label: 'Từ chối', color: 'error' },
  { value: KtxDonTrangThai.DaHuy, label: 'Đã hủy', color: 'default' },
];

export const KtxLoaiDonOptions = [
  { value: KtxLoaiDon.DangKyMoi, label: 'Đăng ký mới' },
  { value: KtxLoaiDon.GiaHan, label: 'Gia hạn' },
  { value: KtxLoaiDon.ChuyenPhong, label: 'Chuyển phòng' },
  { value: KtxLoaiDon.RoiKtx, label: 'Rời KTX' },
];
