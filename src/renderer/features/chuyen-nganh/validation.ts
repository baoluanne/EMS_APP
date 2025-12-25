import { z } from 'zod';

export const ChuyenNganhSchema = z.object({
  id: z.string().optional(),
  maChuyenNganh: z
    .string({ required_error: 'Mã chuyên ngành là bắt buộc' })
    .trim()
    .min(1, { message: 'Mã chuyên ngành là bắt buộc' }),
  tenChuyenNganh: z
    .string({ required_error: 'Tên chuyên ngành là bắt buộc' })
    .trim()
    .min(1, { message: 'Tên chuyên ngành là bắt buộc' }),
  idNganhHoc: z.string({ required_error: 'Mã ngành học là bắt buộc' }),
  maNganhTuQuan: z.coerce.number().min(0).optional(),
  ghiChu: z.string({ invalid_type_error: 'Ghi chú phải là chuỗi.' }).optional(),
});

export type ChuyenNganh = z.infer<typeof ChuyenNganhSchema>;

