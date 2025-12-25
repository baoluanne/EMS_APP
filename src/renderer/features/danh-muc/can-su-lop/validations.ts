import { z } from 'zod';

export const danhMucCanSuLopSchema = z.object({
  id: z.string().uuid().optional(),
  maChucVu: z
    .string({ required_error: 'Mã chức vụ là bắt buộc' })
    .trim()
    .min(1, 'Mã chức vụ là bắt buộc'),
  tenChucVu: z
    .string({ required_error: 'Tên chức vụ là bắt buộc' })
    .trim()
    .min(1, 'Tên chức vụ là bắt buộc'),
  hoatDongDoan: z.boolean(),
  idLoaiChucVu: z
    .string({ required_error: 'Loại chức vụ là bắt buộc' })
    .uuid()
    .min(1, 'Loại chức vụ là bắt buộc'),
  tenTiengAnh: z.string().nullable().optional(),
  diemCong: z.coerce.number().min(0, 'Điểm cộng phải lớn hơn hoặc bằng 0').optional(),
  stt: z.coerce.number().min(0, 'STT phải lớn hơn hoặc bằng 0').optional(),
  ghiChu: z.string().nullable().optional(),
});

export type DanhMucCanSuLop = z.infer<typeof danhMucCanSuLopSchema>;
