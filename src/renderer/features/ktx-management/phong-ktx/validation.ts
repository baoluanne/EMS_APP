import { z } from 'zod';

export const phongKtxSchema = z.object({
  id: z.string().nullable().optional(),
  maPhong: z.string().min(1, 'Mã phòng là bắt buộc'),
  toaNhaId: z.string().min(1, 'Tòa nhà là bắt buộc'),
  tenToaNha: z.string().optional(),
  soLuongGiuong: z.coerce
    .number()
    .int()
    .min(4, 'Tối thiểu 4 giường')
    .max(12, 'Tối đa 12 giường')
    .default(4),
  soLuongDaO: z.coerce.number().int().default(0),
  trangThai: z.string().default('HOAT_DONG'),
  giaPhong: z.coerce.number().min(0, 'Giá phòng không được âm').default(0),
});

export type PhongKtxs = z.infer<typeof phongKtxSchema>;
