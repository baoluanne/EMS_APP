import { z } from 'zod';

export const toaNhaSchema = z.object({
  id: z.string().nullable().optional(),
  tenToaNha: z.string().min(1, 'Tên tòa nhà không được để trống'),
  loaiToaNha: z.string().min(1, 'Vui lòng nhập loại tòa nhà (Nam/Nữ/Hỗn hợp)'),
  ghiChu: z.string().nullable().optional(),
});

export type ToaNhaKtx = z.infer<typeof toaNhaSchema>;
