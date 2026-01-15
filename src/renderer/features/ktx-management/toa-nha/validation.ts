import { z } from 'zod';

export const toaNhaSchema = z.object({
  id: z.string().nullable().optional(),
  tenToaNha: z.string().min(1, 'Tên tòa nhà không được để trống'),
  loaiToaNha: z.coerce.number().min(1, 'Vui lòng chọn loại tòa nhà (Nam/Nữ/Hỗn hợp)'),
  soTang: z.coerce.number().min(1, 'vui lòng nhập số tầng'),
  ghiChu: z.string().optional().nullable(),
});

export type ToaNhaKtx = z.infer<typeof toaNhaSchema>;
