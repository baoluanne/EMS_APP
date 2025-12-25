// validations.ts
import { z } from 'zod';

export const mienGiamSinhVienSchema = z.object({
  sinhVienId: z.string().min(1, 'Vui lòng chọn sinh viên'),
  namHocHocKyId: z.string().optional(),
  loaiMienGiam: z.string().min(1, 'Vui lòng chọn loại miễn giảm'),
  chinhSachMienGiamId: z.string().min(1, 'Vui lòng chọn chính sách'),
  soTien: z.coerce.number().min(1, 'Số tiền phải > 0'),
  lyDo: z.string().min(10, 'Lý do ít nhất 10 ký tự'),
  fileDinhKem: z.any().optional(),
});

export type MienGiamSinhVienSchema = z.infer<typeof mienGiamSinhVienSchema>;
