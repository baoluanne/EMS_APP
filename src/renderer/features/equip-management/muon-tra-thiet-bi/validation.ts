// validation.ts
import { z } from 'zod';

export const phieuMuonTraSchema = z.object({
  id: z.string().optional(),
  loaiDoiTuong: z.number().default(0),
  sinhVienId: z.string().uuid().optional().nullable(),
  giangVienId: z.string().uuid().optional().nullable(),
  ngayMuon: z.any(),
  ngayTraDuKien: z.any(),
  ghiChu: z.string().max(500).optional(),
  chiTietPhieuMuons: z
    .array(
      z.object({
        thietBiId: z.string().min(1, 'Phải chọn thiết bị'),
        tinhTrangKhiMuon: z.string().default('Bình thường'),
      }),
    )
    .min(1, 'Phải chọn ít nhất 1 thiết bị'),
});

// Thêm type cho filter
export interface PhieuMuonTraFilterState {
  maPhieu?: string;
  tenNguoiMuon?: string;
  maThietBi?: string;
  tenThietBi?: string;
  trangThaiText?: string;
  loaiDoiTuongText?: string;
}
