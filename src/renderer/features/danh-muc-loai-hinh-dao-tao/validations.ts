import { z } from 'zod';

export const danhMucLoaiHinhDaoTaoSchema = z.object({
  id: z.string().optional(),
  maLoaiDaoTao: z
    .string({ required_error: 'Mã loại hình đào tạo là bắt buộc' })
    .trim()
    .min(1, 'Mã loại hình đào tạo là bắt buộc'),
  tenLoaiDaoTao: z
    .string({ required_error: 'Tên loại hình đào tạo là bắt buộc' })
    .trim()
    .min(1, 'Tên loại hình đào tạo là bắt buộc'),
  tenTiengAnh: z.string().nullable().optional(),
  soThuTu: z.coerce.number().min(0).optional(),
  ghiChu: z.string({ invalid_type_error: 'Ghi chú phải là chuỗi.' }).nullable().optional(),
  isVisible: z.boolean().optional(),
  noiDung: z.string().nullable().optional(),
});

export type DanhMucLoaiHinhDaoTao = z.infer<typeof danhMucLoaiHinhDaoTaoSchema>;
