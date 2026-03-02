import { z } from 'zod';

export const kiemKeTaiSanSchema = z.object({
  id: z.string().optional(),
  tenDotKiemKe: z.string().min(1, 'Tên đợt không được để trống'),
  ngayBatDau: z.any(),
  ngayKetThuc: z.any(),
  // Sửa: Dùng optional() thay vì default() để khớp type input
  daHoanThanh: z.boolean().optional(),
  ghiChu: z.string().optional().nullable(),
  phongId: z.string().optional(),
  chiTietKiemKes: z
    .array(
      z.object({
        thietBiId: z.string(),
        maThietBi: z.string().optional(),
        tenThietBi: z.string().optional(),
        trangThaiSoSach: z.number(),
        trangThaiThucTe: z.number(),
        khopDot: z.boolean(),
        ghiChu: z.string().optional().nullable(),
      }),
    )
    .min(1, 'Phải có ít nhất 1 thiết bị trong đợt kiểm kê'),
});

export type KiemKeTaiSan = z.infer<typeof kiemKeTaiSanSchema>;

export interface KiemKeTaiSanFilterState {
  tenDotKiemKe?: string;
  ngayBatDau?: string;
  ngayKetThuc?: string;
  trangThaiText?: string;
}
