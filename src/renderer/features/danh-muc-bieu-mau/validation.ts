import { z } from 'zod';

export const DanhMucBieuMauSchema = z.object({
  id: z.string().uuid().optional(),
  maBieuMau: z
    .string({ required_error: 'Mã biểu mẫu là bắt buộc' })
    .trim()
    .min(1, { message: 'Mã biểu mẫu là bắt buộc' }),
  tenBieuMau: z
    .string({ required_error: 'Tên biểu mẫu là bắt buộc' })
    .trim()
    .min(1, { message: 'Tên biểu mẫu là bắt buộc' }),
  loaiFile: z.coerce
    .number({
      required_error: 'Loại file là bắt buộc',
      invalid_type_error: 'Loại file là bắt buộc',
    })
    .min(1, 'Loại file là bắt buộc'),
  ghiChu: z.string().nullable().optional(),
  idKhoaQuanLy: z
    .string({ required_error: 'Khoa quản lý là bắt buộc' })
    .uuid({ message: 'Khoa quản lý là bắt buộc' }),
});

export type DanhMucBieuMau = z.infer<typeof DanhMucBieuMauSchema>;
