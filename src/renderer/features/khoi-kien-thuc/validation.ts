import { z } from 'zod';

export const KhoiKienThucSchema = z.object({
  id: z.string().optional(),
  maKhoiKienThuc: z
    .string({ required_error: 'Mã khối kiến thức là bắt buộc' })
    .trim()
    .min(1, { message: 'Mã khối kiến thức là bắt buộc' }),
  tenKhoiKienThuc: z
    .string({ required_error: 'Tên khối kiến thức là bắt buộc' })
    .trim()
    .min(1, { message: 'Mã khối kiến thức là bắt buộc' }),
  stt: z.coerce.number().min(0).optional(),
  ghiChu: z.string().nullable().optional(),
});

export type KhoiKienThuc = z.infer<typeof KhoiKienThucSchema>;
