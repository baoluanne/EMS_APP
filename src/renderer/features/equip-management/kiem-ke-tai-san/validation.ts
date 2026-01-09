import { z } from 'zod';

export const kiemKeTaiSanSchema = z.object({
  id: z.string().optional(),
  tenDotKiemKe: z.string().min(1, 'Tên đợt kiểm kê không được để trống'),
  ngayBatDau: z.string().min(1, 'Ngày bắt đầu không được để trống'),
  ngayKetThuc: z.string().min(1, 'Ngày kết thúc không được để trống'),
  daHoanThanh: z.boolean().optional(),
  ghiChu: z.string().optional().nullable(),
});

export type KiemKeTaiSan = z.infer<typeof kiemKeTaiSanSchema>;
