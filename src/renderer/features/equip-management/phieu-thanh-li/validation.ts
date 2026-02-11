import { z } from 'zod';

export const phieuThanhLySchema = z.object({
  id: z.string().optional(),
  soQuyetDinh: z.string().min(1, 'Số quyết định là bắt buộc').max(50, 'Tối đa 50 ký tự'),
  ngayThanhLy: z.any(),
  lyDo: z.string().max(500).optional(),
  nguoiLapPhieuId: z.string().uuid().optional(),
  chiTietThanhLys: z
    .array(
      z.object({
        thietBiId: z.string().min(1, 'Phải chọn thiết bị'),
        giaBan: z.number().min(0, 'Giá bán không được âm').default(0),
        ghiChu: z.string().max(500).optional(),
      }),
    )
    .min(1, 'Phải chọn ít nhất 1 thiết bị để thanh lý'),
});

export interface PhieuThanhLyFilterState {
  soQuyetDinh?: string;
  nguoiLapPhieu?: string;
  thietBi?: string;
  lyDo?: string;
  ngayThanhLy?: string; // Nhận chuỗi "dd/MM/yyyy"
}