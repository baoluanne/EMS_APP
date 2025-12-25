import { z } from 'zod';

export const TieuChiTuyenSinhSchema = z.object({
  id: z.string().nullable().optional(),
  maTieuChiTuyenSinh: z
    .string({ required_error: 'Mã tiêu chí tuyển sinh là bắt buộc' })
    .trim()
    .min(1, { message: 'Mã tiêu chí tuyển sinh là bắt buộc' }),
  tenTieuChiTuyenSinh: z
    .string({ required_error: 'Tên tiêu chí tuyển sinh là bắt buộc' })
    .trim()
    .min(1, { message: 'Tên tiêu chí tuyển sinh là bắt buộc' }),
  ghiChu: z.string().nullable().optional(),
});

export type TieuChiTuyenSinh = z.infer<typeof TieuChiTuyenSinhSchema>;
