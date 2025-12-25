import { z } from 'zod';

export const KhoaSchema = z.object({
  id: z.string().optional(),
  maKhoa: z
    .string({ required_error: 'Mã khoa là bắt buộc' })
    .trim()
    .min(1, { message: 'Mã khoa là bắt buộc' }),
  tenKhoa: z
    .string({ required_error: 'Tên khoa là bắt buộc' })
    .trim()
    .min(1, { message: 'Mã khoa là bắt buộc' }),
});

export type Khoa = z.infer<typeof KhoaSchema>;
