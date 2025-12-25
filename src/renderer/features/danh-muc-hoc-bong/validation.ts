import { z } from 'zod';

export const DanhMucHocBongSchema = z.object({
  id: z.string().optional(),
  maDanhMuc: z
    .string({ required_error: 'Mã học bổng là bắt buộc' })
    .trim()
    .min(1, { message: 'Trường này không được để trống.' }),
  tenDanhMuc: z
    .string({ required_error: 'Tên học bổng là bắt buộc' })
    .trim()
    .min(1, { message: 'Trường này không được để trống.' }),
  stt: z.coerce.number().optional(),
});

export type DanhMucHocBong = z.infer<typeof DanhMucHocBongSchema>;
