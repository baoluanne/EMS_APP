import { z } from 'zod';

export const kiemKeTaiSanSchema = z.object({
  id: z.string().optional(),
  tenDotKiemKe: z
    .string({ required_error: 'Tên đợt không được để trống' })
    .min(1, 'Tên đợt không được để trống'),
  ngayBatDau: z.preprocess(
    (val) => (val === null || val === undefined ? '' : val),
    z.string().min(1, 'Ngày bắt đầu không được để trống'),
  ),
  ngayKetThuc: z.preprocess(
    (val) => (val === null || val === undefined ? '' : val),
    z.string().min(1, 'Ngày kết thúc không được để trống'),
  ),
  daHoanThanh: z.boolean().optional(),
  ghiChu: z.string().optional().nullable(),
});

export type KiemKeTaiSan = z.infer<typeof kiemKeTaiSanSchema>;

export const chiTietKiemKeSchema = z.object({
  id: z.string().optional(),
  dotKiemKeId: z.string(),
  thietBiId: z.string(),
  trangThaiSoSach: z.number(),
  trangThaiThucTe: z.number(),
  khopDot: z.boolean(),
  ghiChu: z.string().optional().nullable(),
});

export type ChiTietKiemKe = z.infer<typeof chiTietKiemKeSchema>;
