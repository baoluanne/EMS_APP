import { z } from 'zod';

export const danhMucHoSoHssvSchema = z.object({
  id: z.string().uuid().optional(),
  maHoSo: z
    .string({ required_error: 'Mã hồ sơ là bắt buộc' })
    .trim()
    .min(1, 'Mã hồ sơ là bắt buộc'),
  tenHoSo: z
    .string({ required_error: 'Tên hồ sơ là bắt buộc' })
    .trim()
    .min(1, 'Tên hồ sơ là bắt buộc'),
  stt: z.coerce.number().min(0, 'Số thứ tự phải lớn hơn hoặc bằng 0').optional(),
  ghiChu: z.string().nullable().optional(),
});

export type DanhMucHoSoHssv = z.infer<typeof danhMucHoSoHssvSchema>;
