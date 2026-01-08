import { z } from 'zod';

export const loaiThietBiSchema = z.object({
  id: z.string().nullable().optional(),
  maLoai: z.string().min(1, 'Mã loại thiết bị không được để trống'),
  tenLoai: z.string().min(1, 'Tên loại thiết bị không được để trống'),
  moTa: z.string().nullable().optional(),
});

export type LoaiThietBi = z.infer<typeof loaiThietBiSchema>;
