import { z } from 'zod';

export const loaiThietBiSchema = z.object({
  id: z.string().nullable().optional(),
  maLoai: z.string(),
  tenLoai: z.string().nullable().optional(),
  moTa: z.string().nullable().optional(),
});

export type LoaiThietBi = z.infer<typeof loaiThietBiSchema>;
