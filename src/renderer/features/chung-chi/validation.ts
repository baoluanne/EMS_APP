import { z } from 'zod';

export const ChungChiSchema = z.object({
  id: z.string().nullable().optional(),
  tenLoaiChungChi: z
    .string({ required_error: 'Mã loại chứng chỉ là bắt buộc' })
    .trim()
    .min(1, { message: 'Trường này không được để trống.' }),
  kyHieu: z.string().nullable().optional(),
  giaTri: z.coerce.number().min(0).optional(),
  hocPhi: z.coerce.number().min(0).optional(),
  lePhiThi: z.coerce.number().min(0).optional(),
  thoiHan: z.coerce.number().min(0).optional(),
  diemQuyDinh: z.coerce.number().min(0).optional(),
  ghiChu: z.string().nullable().optional(),
  idLoaiChungChi: z.string(),
});

export type ChungChi = z.infer<typeof ChungChiSchema>;
