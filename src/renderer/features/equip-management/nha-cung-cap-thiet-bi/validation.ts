import { z } from 'zod';

export const nhaCungCapSchema = z.object({
  id: z.string().nullable().optional(),
  tenNhaCungCap: z.string().min(1, 'Tên nhà cung cấp không được để trống'),
  dienThoai: z
    .string()
    .min(1, 'Điện thoại không được để trống')
    .regex(/^\d+$/, 'Điện thoại phải là số'),
  email: z.string().min(1, 'Email không được để trống').email('Email không hợp lệ'),
  diaChi: z.string().nullable().optional(),
  ghiChu: z.string().nullable().optional(),
});

export type NhaCungCap = z.infer<typeof nhaCungCapSchema>;
