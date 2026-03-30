import { z } from 'zod';

export const chiTietThietBiSchema = z.object({
  thietBiId: z.string().min(1),
  nhaCungCapId: z.string().optional().nullable(),
  tinhTrangSauSua: z.string().optional().nullable(),
  chiPhiRieng: z.coerce.number().optional().nullable(),
  ghiChu: z.string().optional().nullable(),
});

export const phieuBaoTriSchema = z.object({
  id: z.string().optional(),
  maPhieu: z.string().min(1, 'Mã phiếu là bắt buộc'),
  chiTietThietBis: z
    .array(chiTietThietBiSchema)
    .min(1, 'Vui lòng chọn ít nhất một thiết bị'),
  nguoiLapPhieuId: z.string().min(1, 'Người lập phiếu là bắt buộc'),
  nguoiXuLyId: z.string().optional().nullable(),
  loaiBaoTri: z.number(),
  ngayBatDau: z.any(),
  ngayKetThuc: z.any().optional().nullable(),
  noiDungBaoTri: z.string().min(1, 'Vui lòng nhập nội dung cần bảo trì'),
  ketQuaXuLy: z.string().optional().nullable(),
  chiPhi: z.coerce.number().min(0, 'Chi phí không được âm'),
  ghiChu: z.string().optional().nullable(),
  trangThai: z.number(),
  hinhAnhUrl: z.string().optional().nullable(),
});

export type PhieuBaoTri = z.infer<typeof phieuBaoTriSchema>;
export type ChiTietThietBiForm = z.infer<typeof chiTietThietBiSchema>;

export interface PhieuBaoTriFilterState {
  maPhieu?: string;
  tuNgay?: string;
  denNgay?: string;
  trangThaiText?: string;
}