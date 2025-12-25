import { z } from 'zod';

export const LoaiChungChiSchema = z.object({
  id: z.string().nullable().optional(),
  maLoaiChungChi: z
    .string({ required_error: 'Mã loại chứng chỉ là bắt buộc' })
    .trim()
    .min(1, { message: 'Trường này không được để trống.' }),
  tenLoaiChungChi: z
    .string({ required_error: 'Tên loại chứng chỉ là bắt buộc' })
    .trim()
    .min(1, { message: 'Trường này không được để trống.' }),
  stt: z.coerce.number().min(0).optional(),
  ghiChu: z.string().nullable().optional(),
});

export type LoaiChungChi = z.infer<typeof LoaiChungChiSchema>;
