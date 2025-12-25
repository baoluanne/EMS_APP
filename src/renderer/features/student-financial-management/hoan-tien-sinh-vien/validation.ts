// src/renderer/features/student-financial-management/quan-ly-cong-no/hoan-tien-sinh-vien/validations.ts
import { z } from 'zod';

export const phieuChiSchema = z.object({
  id: z.string().optional(),
  sinhVienId: z.string().min(1, 'Vui lòng chọn sinh viên'),
  soTien: z.coerce.number().min(1, 'Số tiền phải > 0'),
  lyDoChi: z.string().min(1, 'Vui lòng nhập lý do'),
  hinhThucChi: z.string().min(1, 'Vui lòng chọn hình thức'),
  soTaiKhoanNhan: z.string().optional(),
  nganHangNhan: z.string().optional(),
});

export type PhieuChiSchema = z.infer<typeof phieuChiSchema>;
