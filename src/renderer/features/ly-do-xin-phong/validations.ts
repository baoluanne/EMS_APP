import { z } from 'zod';

export const LyDoXinPhongSchema = z.object({
  id: z.string().optional(),
  maLoaiXinPhong: z
    .string({ required_error: 'Mã loại xin phòng là bắt buộc' })
    .trim()
    .min(1, { message: 'Mã loại xin phòng là bắt buộc' }),
  tenLoaiXinPhong: z
    .string({ required_error: 'Tên loại xin phòng là bắt buộc' })
    .trim()
    .min(1, { message: 'Tên loại xin phòng là bắt buộc' }),
  soThuTu: z.coerce.number().optional(),
});

export type LyDoXinPhong = z.infer<typeof LyDoXinPhongSchema>;
