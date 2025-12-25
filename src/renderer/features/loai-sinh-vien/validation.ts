import { z } from 'zod';

export const LoaiSinhVienSchema = z.object({
  id: z.string().nullable().optional(),
  maLoaiSinhVien: z
    .string({ required_error: 'Mã loại sinh viên là bắt buộc' })
    .trim()
    .min(1, { message: 'Mã loại sinh viên là bắt buộc' }),
  tenLoaiSinhVien: z
    .string({ required_error: 'Tên loại sinh viên là bắt buộc' })
    .trim()
    .min(1, { message: 'Tên loại sinh viên là bắt buộc' }),
  ghiChu: z.string().nullable().optional(),
});

export type LoaiSinhVien = z.infer<typeof LoaiSinhVienSchema>;
